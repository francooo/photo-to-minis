import "./env.js";
import express from "express";
import path from "path";
import { createApp } from "./app.js";

// Servidor local (npm run dev / npm start). Na Vercel quem atende é api/index.ts.
const app = createApp();
const PORT = 5001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(process.cwd(), "dist/public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/public/index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
