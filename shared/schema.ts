import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const miniatureOrders = sqliteTable("miniature_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  photoUrl: text("photo_url").notNull(),
  photoPath: text("photo_path").notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export const insertMiniatureOrderSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  photoUrl: z.string().url(),
  photoPath: z.string().min(1),
});

export type InsertMiniatureOrder = z.infer<typeof insertMiniatureOrderSchema>;
export type MiniatureOrder = typeof miniatureOrders.$inferSelect;
