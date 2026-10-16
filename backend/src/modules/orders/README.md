# orders module

Order creation, price snapshots, owner history, and authorized status changes.

Reserved implementation files: orders.routes.ts, orders.controller.ts, and orders.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: orders, orderItems, products, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: createOrderInputSchema, orderSchema, updateOrderStatusInputSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
