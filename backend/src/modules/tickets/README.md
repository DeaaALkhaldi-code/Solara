# tickets module

Customer support tickets, replies, and separate staff-only notes.

Reserved implementation files: tickets.routes.ts, tickets.controller.ts, and tickets.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: tickets, ticketReplies, ticketNotes, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: createTicketInputSchema, ticketSchema, ticketReplyInputSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
