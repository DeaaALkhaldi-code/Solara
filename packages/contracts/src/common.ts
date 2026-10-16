import { z } from "zod";

export const healthSchema = z.object({ status: z.literal("ok") });
export type HealthResponse = z.infer<typeof healthSchema>;

export const apiErrorSchema = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});
export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
