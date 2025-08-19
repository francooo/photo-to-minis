import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderNotificationRequest {
  name: string;
  email: string;
  phone: string;
  photo_url: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, photo_url }: OrderNotificationRequest = await req.json();

    console.log("Sending order notification for:", { name, email, phone });

    const emailResponse = await resend.emails.send({
      from: "3D Max <onboarding@resend.dev>",
      to: ["andrewsfranco93@gmail.com"],
      subject: "Novo Pedido de Miniatura 3D - " + name,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Novo Pedido de Miniatura 3D</h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #334155; margin-top: 0;">Dados do Cliente:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
          </div>

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Foto Enviada:</h3>
            <div style="text-align: center;">
              <img src="${photo_url}" alt="Foto do cliente" style="max-width: 300px; max-height: 300px; border-radius: 8px; border: 2px solid #e2e8f0;" />
            </div>
            <p style="margin-top: 10px; font-size: 14px; color: #64748b;">
              Link da foto: <a href="${photo_url}" target="_blank">${photo_url}</a>
            </p>
          </div>

          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Próximos passos:</strong> Entre em contato com o cliente para confirmar os detalhes e iniciar o processo de criação da miniatura.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);