import express, { type NextFunction, type Request, type Response } from "express";
import multer from "multer";
import { registerRoutes } from "./routes.js";

// App Express sem listen: usado pelo servidor local (server/index.ts)
// e pela função serverless da Vercel (api/index.ts).
export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  registerRoutes(app);

  // Erros de upload (arquivo grande, tipo inválido) viram 400 em JSON
  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    if (err instanceof multer.MulterError || (err instanceof Error && err.message === "Only image files are allowed")) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
