import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const miniatureOrders = pgTable("miniature_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  photoUrl: text("photo_url").notNull(),
  photoPath: text("photo_path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMiniatureOrderSchema = createInsertSchema(miniatureOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMiniatureOrder = z.infer<typeof insertMiniatureOrderSchema>;
export type MiniatureOrder = typeof miniatureOrders.$inferSelect;
