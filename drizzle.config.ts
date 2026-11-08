import { defineConfig } from "drizzle-kit";

try {
  process.loadEnvFile();
} catch {
  // .env opcional: em produção a variável vem do ambiente
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
