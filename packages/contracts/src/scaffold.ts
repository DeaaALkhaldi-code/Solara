import { z } from "zod";

// Transport diagnostics only; this schema makes no claim that business features work.
export const scaffoldModuleSchema = z.enum(["auth", "users", "products", "estimates", "orders", "tickets"]);
export const scaffoldStatusSchema = z.object({
  module: scaffoldModuleSchema,
  status: z.literal("scaffold"),
  implemented: z.literal(false),
}).strict();
export type ScaffoldStatus = z.infer<typeof scaffoldStatusSchema>;
