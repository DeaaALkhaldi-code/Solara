import { z } from "zod";

export const orderStatusSchema = z.enum(["pending", "confirmed", "processing", "completed", "cancelled"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;
