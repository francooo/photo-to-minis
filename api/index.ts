import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/app.js";

// Função serverless da Vercel: todas as rotas /api/* são reescritas para cá
// (vercel.json) e atendidas pelo mesmo app Express do servidor local.
const app = createApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // A Vercel injeta um getter em req.body; o Express e o multer precisam
  // gravar req.body, então trocamos por uma propriedade comum.
  try {
    Object.defineProperty(req, "body", { value: undefined, writable: true, configurable: true, enumerable: true });
  } catch {
    // propriedade não configurável: segue com o comportamento padrão
  }
  return app(req as any, res as any);
}
