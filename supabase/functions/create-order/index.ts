import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const photo = formData.get("photo") as File;

    if (!name || !email || !phone || !photo) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upload photo to Supabase Storage
    const fileExt = photo.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `orders/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("order-photos")
      .upload(filePath, photo, {
        contentType: photo.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload photo" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("order-photos")
      .getPublicUrl(filePath);

    const photoUrl = publicUrlData.publicUrl;

    // Insert order into database
    const { data: order, error: insertError } = await supabase
      .from("miniature_orders")
      .insert({
        name,
        email,
        phone,
        photo_url: photoUrl,
        photo_path: filePath,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend
    if (resendApiKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "3D Max <onboarding@resend.dev>",
            to: ["andrewsfranco93@gmail.com"],
            subject: `Novo Pedido de Miniatura 3D - ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #030712; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #1e293b;">
                <h1 style="color: #3b82f6; text-align: center; font-size: 24px; margin-bottom: 30px;">Novo Pedido de Miniatura</h1>
                
                <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
                  <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0;">Dados do Cliente</h2>
                  <p style="margin: 5px 0;"><strong>Nome:</strong> ${name}</p>
                  <p style="margin: 5px 0;"><strong>E-mail:</strong> ${email}</p>
                  <p style="margin: 5px 0;"><strong>Telefone:</strong> ${phone}</p>
                </div>

                <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border: 1px solid #1e293b; text-align: center;">
                  <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0; text-align: left;">Referência Visual</h2>
                  <div style="margin-bottom: 20px;">
                    <img src="${photoUrl}" alt="Foto do Cliente" width="250" style="width: 250px; height: auto; border-radius: 8px; border: 1px solid #334155; display: block; margin: 0 auto;" />
                  </div>
                  <p style="margin-top: 15px;"><a href="${photoUrl}" style="color: #3b82f6; text-decoration: none; font-size: 12px;">Link direto da imagem</a></p>
                </div>

                <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
                  <p>Este é um e-mail automático gerado pelo sistema 3D Max.</p>
                </div>
              </div>
            `,
          }),
        });

        if (!emailRes.ok) {
          console.error("Email send failed:", await emailRes.text());
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, order }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
