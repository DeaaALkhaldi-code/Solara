import { z } from "zod";

export const healthSchema = z.object({ status: z.literal("ok") });
export type HealthResponse = z.infer<typeof healthSchema>;

export const apiErrorSchema = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;

export const idSchema = z.uuid();
export const dateTimeSchema = z.iso.datetime({ offset: true });
export const currencySchema = z.string().regex(/^[A-Z]{3}$/);
export const moneyMinorSchema = z.number().int().min(0).max(2147483647);
export const quantitySchema = z.number().int().min(1).max(10000);
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
}).strict();

export const addressSchema = z.object({
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  region: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(20).optional(),
  countryCode: z.string().regex(/^[A-Z]{2}$/),
}).strict();

export function paginatedSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    total: z.number().int().nonnegative(),
  }).strict();
}
