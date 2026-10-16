import { z } from "zod";
import { dateTimeSchema, idSchema } from "./common.js";

export const ticketStatuses = ["open", "in_progress", "resolved", "closed"] as const;
export const ticketStatusSchema = z.enum(ticketStatuses);
export type TicketStatus = z.infer<typeof ticketStatusSchema>;

export const createTicketInputSchema = z.object({
  orderId: idSchema.optional(),
  productId: idSchema.optional(),
  issueCategory: z.string().trim().min(1).max(80),
  subject: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(10000),
}).strict();
export const ticketReplyInputSchema = z.object({ message: z.string().trim().min(1).max(10000) }).strict();
export const updateTicketStatusInputSchema = z.object({ status: ticketStatusSchema }).strict();
export const ticketReplySchema = ticketReplyInputSchema.extend({
  id: idSchema, ticketId: idSchema, authorId: idSchema, createdAt: dateTimeSchema,
}).strict();
// Customer response intentionally has no internalNotes field.
export const ticketSchema = createTicketInputSchema.extend({
  id: idSchema,
  userId: idSchema,
  orderId: idSchema.nullable(),
  productId: idSchema.nullable(),
  status: ticketStatusSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
}).strict();
export type CreateTicketInput = z.infer<typeof createTicketInputSchema>;
export type Ticket = z.infer<typeof ticketSchema>;
export type TicketReply = z.infer<typeof ticketReplySchema>;
