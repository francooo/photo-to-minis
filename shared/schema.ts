import { z } from "zod";

export const insertMiniatureOrderSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  photoUrl: z.string().url(),
  photoPath: z.string().min(1),
});

export type InsertMiniatureOrder = z.infer<typeof insertMiniatureOrderSchema>;

export interface MiniatureOrder extends InsertMiniatureOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
}
