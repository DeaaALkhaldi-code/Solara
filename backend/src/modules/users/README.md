# users module

Own-profile reads/updates and administrator user management.

Reserved implementation files: users.routes.ts, users.controller.ts, and users.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: users, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: userSchema, userProfileInputSchema, userRoleSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
