import { z } from "zod";

export const ticketStatusSchema = z.enum(["open", "in_progress", "resolved", "closed"]);
export type TicketStatus = z.infer<typeof ticketStatusSchema>;
