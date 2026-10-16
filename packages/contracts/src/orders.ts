import { z } from "zod";
import { addressSchema, currencySchema, dateTimeSchema, idSchema, moneyMinorSchema, quantitySchema } from "./common.js";
import { emailSchema } from "./users.js";

export const orderStatuses = ["pending", "confirmed", "processing", "completed", "cancelled"] as const;
export const orderStatusSchema = z.enum(orderStatuses);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const cartItemSchema = z.object({ productId: idSchema, quantity: quantitySchema }).strict();
export const createOrderInputSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(100),
  contactName: z.string().trim().min(1).max(120),
  contactEmail: emailSchema,
  contactPhone: z.string().trim().min(5).max(30),
  deliveryAddress: addressSchema,
}).strict();
export const updateOrderStatusInputSchema = z.object({ status: orderStatusSchema }).strict();
export const orderItemSchema = cartItemSchema.extend({
  id: idSchema,
  productName: z.string().min(1).max(200),
  unitPriceMinor: moneyMinorSchema,
}).strict();
export const orderSchema = createOrderInputSchema.omit({ items: true }).extend({
  id: idSchema,
  userId: idSchema,
  items: z.array(orderItemSchema),
  status: orderStatusSchema,
  trackingReference: z.string().nullable(),
  totalMinor: moneyMinorSchema,
  currency: currencySchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
}).strict();
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
export type Order = z.infer<typeof orderSchema>;
