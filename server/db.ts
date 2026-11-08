import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida. Configure a connection string do Neon no .env (local) ou nas variáveis da Vercel");
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Em serverless cada instância deve abrir poucas conexões; o pooler do Neon faz o resto
  max: process.env.VERCEL ? 3 : 10,
});
export const db = drizzle(pool, { schema });
