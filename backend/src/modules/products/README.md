# products module

Public product/category browsing and authorized catalog management.

Reserved implementation files: products.routes.ts, products.controller.ts, and products.service.ts. Add them when the feature is implemented; no business routes are mounted now.

Database tables: products, categories, imported from ../../db/schema.js. Access the initialized Drizzle instance with getDatabase() from ../../config/database.js. Use transactions for related writes.

Shared contracts: productInputSchema, productSchema, categoryInputSchema, categorySchema, imported from @solara/contracts. Validate inputs on the backend, enforce verified identity/role/ownership, and map explicit response DTOs. Authentication flows are not implemented; no stub grants access.
