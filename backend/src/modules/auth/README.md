# auth module

Registration, login/logout, session verification, and session revocation.

Reserved implementation files: auth.routes.ts, auth.controller.ts, and auth.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: users, sessions, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: registerInputSchema, loginInputSchema, authResponseSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
