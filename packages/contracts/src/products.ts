import { z } from "zod";
import { currencySchema, dateTimeSchema, idSchema, moneyMinorSchema } from "./common.js";

export const slugSchema = z.string().min(1).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const categoryInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugSchema.max(160),
  description: z.string().trim().max(5000).nullable().optional(),
}).strict();
export const categorySchema = categoryInputSchema.extend({ id: idSchema, createdAt: dateTimeSchema, updatedAt: dateTimeSchema }).strict();
export const productInputSchema = z.object({
  categoryId: idSchema,
  name: z.string().trim().min(1).max(200),
  slug: slugSchema,
  description: z.string().trim().min(1).max(20000),
  imageUrls: z.array(z.url({ protocol: /^https?$/ })).max(20).default([]),
  specifications: z.record(z.string(), z.unknown()).default({}),
  priceMinor: moneyMinorSchema,
  currency: currencySchema,
  stockQuantity: z.number().int().min(0).max(2147483647),
  available: z.boolean().default(true),
}).strict();
export const productSchema = productInputSchema.extend({ id: idSchema, createdAt: dateTimeSchema, updatedAt: dateTimeSchema }).strict();
export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;
export type Category = z.infer<typeof categorySchema>;
