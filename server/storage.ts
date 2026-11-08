import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { miniatureOrders, type InsertMiniatureOrder, type MiniatureOrder } from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertMiniatureOrder): Promise<MiniatureOrder>;
  getOrders(): Promise<MiniatureOrder[]>;
  getOrder(id: string): Promise<MiniatureOrder | undefined>;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class DatabaseStorage implements IStorage {
  async createOrder(order: InsertMiniatureOrder): Promise<MiniatureOrder> {
    const [result] = await db.insert(miniatureOrders).values(order).returning();
    return result;
  }

  async getOrders(): Promise<MiniatureOrder[]> {
    return await db.select().from(miniatureOrders).orderBy(desc(miniatureOrders.createdAt));
  }

  async getOrder(id: string): Promise<MiniatureOrder | undefined> {
    if (!UUID_RE.test(id)) return undefined;
    const [result] = await db.select().from(miniatureOrders).where(eq(miniatureOrders.id, id));
    return result;
  }
}

export const storage = new DatabaseStorage();
