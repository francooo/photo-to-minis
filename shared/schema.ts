import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const miniatureOrders = pgTable("miniature_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  photoUrl: text("photo_url"),
  photoPath: text("photo_path"),
  orderType: text("order_type").notNull().default("photo_miniature"),
  modelName: text("model_name"),
  modelDisplayName: text("model_display_name"),
  modelImageUrl: text("model_image_url"),
  sourcePage: text("source_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const optionalText = z.string().nullish().transform((v) => (v ? v : null));

export const insertMiniatureOrderSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  photoUrl: optionalText,
  photoPath: optionalText,
  orderType: z.string().min(1).default("photo_miniature"),
  modelName: optionalText,
  modelDisplayName: optionalText,
  modelImageUrl: optionalText,
  sourcePage: z.string().min(1).default("home"),
});

export type InsertMiniatureOrder = z.infer<typeof insertMiniatureOrderSchema>;
export type MiniatureOrder = typeof miniatureOrders.$inferSelect;
