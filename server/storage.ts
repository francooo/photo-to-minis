import { desc, eq } from "drizzle-orm";
import { db } from "./db.js";
import {
  miniatureOrders,
  orderPhotos,
  type InsertMiniatureOrder,
  type MiniatureOrder,
  type NewOrderPhoto,
  type OrderPhoto,
} from "../shared/schema.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class DatabaseStorage {
  /** Grava o pedido e, se houver, a foto na mesma transação. */
  async createOrder(order: InsertMiniatureOrder, photo?: NewOrderPhoto): Promise<MiniatureOrder> {
    return db.transaction(async (tx) => {
      const [created] = await tx.insert(miniatureOrders).values(order).returning();
      if (photo) {
        await tx.insert(orderPhotos).values({ ...photo, orderId: created.id });
      }
      return created;
    });
  }

  async getOrders(): Promise<MiniatureOrder[]> {
    return db.select().from(miniatureOrders).orderBy(desc(miniatureOrders.createdAt));
  }

  async getOrder(id: string): Promise<MiniatureOrder | undefined> {
    if (!UUID_RE.test(id)) return undefined;
    const [result] = await db.select().from(miniatureOrders).where(eq(miniatureOrders.id, id));
    return result;
  }

  async getOrderPhoto(orderId: string): Promise<OrderPhoto | undefined> {
    if (!UUID_RE.test(orderId)) return undefined;
    const [result] = await db.select().from(orderPhotos).where(eq(orderPhotos.orderId, orderId)).limit(1);
    return result;
  }
}

export const storage = new DatabaseStorage();
