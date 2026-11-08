import { pgTable, text, uuid, timestamp, integer, customType, index } from "drizzle-orm/pg-core";
import { z } from "zod";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

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

// Fotos dos pedidos, guardadas no próprio Neon. Ficam numa tabela à parte
// para que listar pedidos não carregue os bytes das imagens.
export const orderPhotos = pgTable(
  "order_photos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => miniatureOrders.id, { onDelete: "cascade" }),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull(),
    data: bytea("data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("order_photos_order_id_idx").on(t.orderId)],
);

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

export type InsertMiniatureOrder = typeof miniatureOrders.$inferInsert;
export type MiniatureOrder = typeof miniatureOrders.$inferSelect;
export type NewOrderPhoto = Omit<typeof orderPhotos.$inferInsert, "orderId">;
export type OrderPhoto = typeof orderPhotos.$inferSelect;
