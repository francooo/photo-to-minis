import type { Express, Request } from "express";
import { storage } from "./storage";
import { insertMiniatureOrderSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_EMAIL = "andrewsfranco93@gmail.com";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

function getBaseUrl(req: Request): string {
  let baseUrl = "";
  if (process.env.PUBLIC_BASE_URL) {
    baseUrl = process.env.PUBLIC_BASE_URL;
  } else if (process.env.REPLIT_DEV_DOMAIN) {
    baseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  } else if (process.env.REPL_EXTERNAL_URL) {
    baseUrl = process.env.REPL_EXTERNAL_URL;
  } else {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.headers["x-forwarded-host"] || req.get("host");
    baseUrl = `${protocol}://${host}`;
  }
  return baseUrl.replace(/\/$/, "");
}

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const field = (body: Record<string, unknown>, key: string): string | null => {
  const v = body[key];
  return typeof v === "string" && v.trim() ? v.trim() : null;
};

const box = (title: string, content: string, extraStyle = "") => `
  <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 25px; ${extraStyle}">
    <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0; text-align: left;">${title}</h2>
    ${content}
  </div>`;

const line = (label: string, value: string | null) =>
  value ? `<p style="margin: 5px 0; color: #e2e8f0;"><strong>${label}:</strong> ${esc(value)}</p>` : "";

export async function registerRoutes(app: Express) {
  app.get("/api/orders/:id/download", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);

      if (!order || !order.photoPath) {
        return res.status(404).json({ error: "Order not found" });
      }

      const filePath = path.resolve(process.cwd(), order.photoPath);
      if (!filePath.startsWith(uploadsDir) || !fs.existsSync(filePath)) {
        console.error(`File does not exist on disk: ${filePath}`);
        return res.status(404).json({ error: "File not found on server" });
      }

      const ext = path.extname(order.photoPath);
      const filename = `foto-cliente-${order.name.replace(/[^\w-]+/g, "-").toLowerCase()}${ext}`;

      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/octet-stream");
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      console.error("Error in download route:", error);
      res.status(500).json({ error: "Internal server error during download" });
    }
  });

  app.post("/api/orders", upload.single("photo"), async (req, res) => {
    try {
      const body = req.body as Record<string, unknown>;
      const orderType = field(body, "order_type") ?? "photo_miniature";

      if (orderType === "photo_miniature" && !req.file) {
        return res.status(400).json({ error: "Photo is required for photo miniature orders" });
      }

      const baseUrl = getBaseUrl(req);
      const photoPath = req.file ? `uploads/${req.file.filename}` : null;
      const photoUrl = photoPath ? `${baseUrl}/${photoPath}` : null;

      const validation = insertMiniatureOrderSchema.safeParse({
        name: field(body, "name") ?? "",
        email: field(body, "email") ?? "",
        phone: field(body, "phone") ?? "",
        photoUrl,
        photoPath,
        orderType,
        modelName: field(body, "model_name"),
        modelDisplayName: field(body, "model_display_name"),
        modelImageUrl: field(body, "model_image_url"),
        sourcePage: field(body, "source_page") ?? "home",
      });

      if (!validation.success) {
        if (req.file) fs.rm(req.file.path, () => {});
        return res.status(400).json({ error: validation.error.errors });
      }

      const order = await storage.createOrder(validation.data);

      if (resend) {
        try {
          const isCarOrder = orderType === "car_miniature";
          const scale = field(body, "scale");
          const qty = field(body, "qty");
          const urgency = field(body, "urgency");
          const base = field(body, "base");
          const cep = field(body, "cep");
          const city = field(body, "city");
          const address = field(body, "address");
          const obs = field(body, "obs");
          const modelSub = field(body, "model_sub");

          const subject = isCarOrder
            ? `Novo Pedido de Miniatura - ${order.modelDisplayName} (Velozes e Furiosos)`
            : `Novo Pedido de Miniatura 3D - ${order.name}`;

          const imageSection = isCarOrder
            ? box(
                "Modelo Selecionado",
                `<p style="color: #fff; font-size: 18px; font-weight: bold; margin: 0 0 5px 0;">${esc(order.modelDisplayName)}</p>
                 ${modelSub ? `<p style="color: #94a3b8; margin: 0;">${esc(modelSub)}</p>` : ""}`,
                "text-align: center;",
              )
            : box(
                "Referência Visual",
                `<div style="margin-bottom: 20px;">
                   <img src="${esc(photoUrl)}" alt="Foto do Cliente" width="250" style="width: 250px; height: auto; border-radius: 8px; border: 1px solid #334155; display: block; margin: 0 auto;" />
                 </div>
                 <div style="margin-top: 20px;">
                   <a href="${baseUrl}/api/orders/${order.id}/download" target="_blank" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Download da Imagem</a>
                 </div>
                 <p style="margin-top: 15px;"><a href="${esc(photoUrl)}" style="color: #3b82f6; text-decoration: none; font-size: 12px;">Link direto da imagem</a></p>`,
                "text-align: center;",
              );

          const detailsSection =
            isCarOrder && (scale || qty || urgency || base)
              ? box("Detalhes da Miniatura", line("Escala", scale) + line("Quantidade", qty) + line("Urgência", urgency) + line("Base", base))
              : "";

          const deliverySection =
            isCarOrder && (cep || city || address)
              ? box("Entrega", line("CEP", cep) + line("Cidade", city) + line("Endereço", address))
              : "";

          const obsSection = obs ? box("Observações", `<p style="margin: 5px 0; color: #e2e8f0;">${esc(obs)}</p>`) : "";

          const { error: emailError } = await resend.emails.send({
            from: "3D Max <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #030712; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #1e293b;">
                <h1 style="color: #3b82f6; text-align: center; font-size: 24px; margin-bottom: 30px;">${isCarOrder ? "Novo Pedido - Coleção V&amp;F" : "Novo Pedido de Miniatura"}</h1>
                <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
                  <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0;">Dados do Cliente</h2>
                  <p style="margin: 5px 0;"><strong>Nome:</strong> ${esc(order.name)}</p>
                  <p style="margin: 5px 0;"><strong>E-mail:</strong> ${esc(order.email)}</p>
                  <p style="margin: 5px 0;"><strong>Telefone:</strong> ${esc(order.phone)}</p>
                  <p style="margin: 5px 0;"><strong>Tipo:</strong> ${isCarOrder ? "Miniatura de Carro (V&amp;F)" : "Miniatura Personalizada"}</p>
                </div>
                ${imageSection}
                ${detailsSection}
                ${deliverySection}
                ${obsSection}
                <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
                  <p>Este é um e-mail automático gerado pelo sistema 3D Max.</p>
                </div>
              </div>
            `,
          });
          if (emailError) console.error("Email send failed:", emailError);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }
      } else {
        console.log("Resend API key missing, skipping email notification.");
      }

      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
}
