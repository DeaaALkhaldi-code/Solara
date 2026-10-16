# estimates module

Calculator validation, versioned calculations, saved estimates, and product recommendations.

Reserved implementation files: estimates.routes.ts, estimates.controller.ts, and estimates.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: estimates, estimateProducts, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: calculatorInputSchema, calculatorResultSchema, estimateSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
