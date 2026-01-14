import type { Express } from "express";
import { storage } from "./storage";
import { insertMiniatureOrderSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function registerRoutes(app: Express) {
  app.get("/api/orders/:id/download", async (req, res) => {
    try {
      const id = req.params.id;
      const orders = await storage.getOrders();
      const order = orders.find(o => o.id === id);

      if (!order) {
        console.error(`Order not found for download: ${id}`);
        return res.status(404).json({ error: "Order not found" });
      }

      const filePath = path.resolve(process.cwd(), order.photoPath);
      console.log(`Attempting download for file: ${filePath}`);

      if (!fs.existsSync(filePath)) {
        console.error(`File does not exist on disk: ${filePath}`);
        return res.status(404).json({ error: "File not found on server" });
      }

      const ext = path.extname(order.photoPath);
      const filename = `foto-cliente-${order.name.replace(/\s+/g, '-').toLowerCase()}${ext}`;

      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error in download route:", error);
      res.status(500).json({ error: "Internal server error during download" });
    }
  });

  app.post("/api/orders", upload.single("photo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Photo is required" });
      }

      // Use a more robust way to get the public URL for the image
      const photoPath = `uploads/${req.file.filename}`;
      
      // On Replit, we should prioritize the public development domain
      let baseUrl = "";
      if (process.env.REPLIT_DEV_DOMAIN) {
        baseUrl = `https://${process.env.REPLIT_DEV_DOMAIN}`;
      } else if (process.env.REPL_EXTERNAL_URL) {
        baseUrl = process.env.REPL_EXTERNAL_URL;
      } else {
        const protocol = req.headers["x-forwarded-proto"] || req.protocol;
        const host = req.headers["x-forwarded-host"] || req.get("host");
        baseUrl = `${protocol}://${host}`;
      }
      
      // Ensure there's no trailing slash to avoid double slashes
      baseUrl = baseUrl.replace(/\/$/, "");
      const photoUrl = `${baseUrl}/${photoPath}`;

      const orderData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        photoUrl,
        photoPath,
      };

      const validation = insertMiniatureOrderSchema.safeParse(orderData);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
      }

      const order = await storage.createOrder(validation.data);

      const downloadUrl = `${baseUrl}/api/orders/${order.id}/download`;

      // Send Email Notification via Resend
      try {
        await resend.emails.send({
          from: "3D Max <onboarding@resend.dev>",
          to: ["andrewsfranco93@gmail.com"],
          subject: `Novo Pedido de Miniatura 3D - ${orderData.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #030712; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #1e293b;">
              <h1 style="color: #3b82f6; text-align: center; font-size: 24px; margin-bottom: 30px;">Novo Pedido de Miniatura</h1>
              
              <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
                <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0;">Dados do Cliente</h2>
                <p style="margin: 5px 0;"><strong>Nome:</strong> ${orderData.name}</p>
                <p style="margin: 5px 0;"><strong>E-mail:</strong> ${orderData.email}</p>
                <p style="margin: 5px 0;"><strong>Telefone:</strong> ${orderData.phone}</p>
              </div>

              <div style="background-color: #0f172a; padding: 25px; border-radius: 6px; border: 1px solid #1e293b; text-align: center;">
                <h2 style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 15px 0; text-align: left;">Referência Visual</h2>
                <div style="margin-bottom: 20px;">
                  <img src="${photoUrl}" alt="Foto do Cliente" width="250" style="width: 250px; height: auto; border-radius: 8px; border: 1px solid #334155; display: block; margin: 0 auto;" />
                </div>
                
                <div style="margin-top: 20px;">
                  <a href="${downloadUrl}" target="_blank" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    Download da Imagem
                  </a>
                </div>
                
                <p style="margin-top: 15px;"><a href="${photoUrl}" style="color: #3b82f6; text-decoration: none; font-size: 12px;">Link direto da imagem</a></p>
              </div>

              <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
                <p>Este é um e-mail automático gerado pelo sistema 3D Max.</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // We don't fail the request if only the email fails
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

  app.use("/uploads", (req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=31536000");
    next();
  });
}
