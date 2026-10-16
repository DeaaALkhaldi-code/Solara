# orders module

Order creation, price snapshots, owner history, and authorized status changes.

Connected files: orders.routes.ts, orders.controller.ts, and orders.service.ts. The router is mounted in app.ts. GET /scaffold-status is development-only and returns no business/private data; all registered business operations return explicit HTTP 501 until implemented. Replace TODO handlers only after implementing validation and access checks.

Database tables: orders, orderItems, products, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: createOrderInputSchema, orderSchema, updateOrderStatusInputSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
