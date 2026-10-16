import { z } from "zod";
import { emailSchema, userProfileInputSchema, userSchema } from "./users.js";

// No role or user ID is accepted from registration payloads.
export const registerInputSchema = userProfileInputSchema.extend({
  email: emailSchema,
  password: z.string().min(12).max(128),
}).strict();
export const loginInputSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) }).strict();
export const authResponseSchema = z.object({ user: userSchema }).strict();
export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
