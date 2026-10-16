# estimates module

Calculator validation, versioned calculations, saved estimates, and product recommendations.

Connected files: estimates.routes.ts, estimates.controller.ts, and estimates.service.ts. The router is mounted in app.ts. GET /scaffold-status is development-only and returns no business/private data; all registered business operations return explicit HTTP 501 until implemented. Replace TODO handlers only after implementing validation and access checks.

Database tables: estimates, estimateProducts, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: calculatorInputSchema, calculatorResultSchema, estimateSchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
