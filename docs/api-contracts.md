# API contracts

## Implemented

GET /api/health returns HTTP 200 with `{ "status": "ok" }`. It reports process health, not database readiness after startup. Normal server startup requires a successful MongoDB connection. Business routes are unmounted and return 404.

Errors use `{ "error": { "code": "NOT_FOUND", "message": "Endpoint not found." } }` with a non-success status. Codes: NOT_FOUND (404), INVALID_JSON (400), PAYLOAD_TOO_LARGE (413), UNSUPPORTED_ENCODING (415), VALIDATION_ERROR (400), INTERNAL_ERROR (500). Never expose exceptions or secrets.

@solara/contracts exports healthSchema, apiErrorSchema, inferred types, orderStatusSchema, and ticketStatusSchema. Status enums are initial conventions; transitions must be agreed before business implementation. Add request/response contracts for auth, users, products, estimates, orders, and tickets as features are built. No speculative complete schemas are included.

The frontend apiRequest validates successful JSON against its supplied Zod schema and converts non-success responses into ApiError. Pass a RequestInit signal for cancellation. Serialize bodies with JSON.stringify. Invalid JSON on success fails validation; network/cancellation errors propagate. Future empty-body endpoints need a separate explicit client convention.

## Planned conventions

- Use /api consistently; the base URL already includes it.
- IDs are strings; dates are ISO 8601 strings. Do not expose Mongoose types.
- Money is integer minor units with explicit currency; document supported currencies and rounding.
- Validate input on the backend even if the frontend used the same schema.
- Agree on pagination/filtering before implementing list endpoints.
- Map responses to permitted fields rather than serializing raw user or ticket documents.
- Derive ownership from verified authentication, never a submitted user ID.
- Express is the application API for browser and server-rendered pages.
