import { db } from "./db";
import { miniatureOrders, type InsertMiniatureOrder, type MiniatureOrder } from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertMiniatureOrder): Promise<MiniatureOrder>;
  getOrders(): Promise<MiniatureOrder[]>;
}

export class DatabaseStorage implements IStorage {
  async createOrder(order: InsertMiniatureOrder): Promise<MiniatureOrder> {
    const [result] = await db.insert(miniatureOrders).values(order).returning();
    return result;
  }

  async getOrders(): Promise<MiniatureOrder[]> {
    return await db.select().from(miniatureOrders);
  }
}

export const storage = new DatabaseStorage();
