import { z } from "zod";
import { dateTimeSchema, idSchema } from "./common.js";

export const userRoles = ["customer", "admin"] as const;
export const userRoleSchema = z.enum(userRoles);
export const emailSchema = z.email().max(254).trim().toLowerCase();
export const userProfileInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30).nullable().optional(),
}).strict();
export const userSchema = userProfileInputSchema.extend({
  id: idSchema,
  email: emailSchema,
  role: userRoleSchema,
  phone: z.string().nullable(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
}).strict();
export type User = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type UserProfileInput = z.infer<typeof userProfileInputSchema>;
