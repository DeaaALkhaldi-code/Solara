# API contracts

## Active API

GET /api/health returns HTTP 200 with { "status": "ok" }. It reports process health, not continuous database readiness. Server startup verifies PostgreSQL before listening. Planned business routes are mounted as TODO handlers returning HTTP 501 (NOT_IMPLEMENTED); unknown URLs return 404.

Errors: { "error": { "code": "NOT_FOUND", "message": "Endpoint not found." } }.
Codes include NOT_IMPLEMENTED (501), NOT_FOUND (404), INVALID_JSON (400), PAYLOAD_TOO_LARGE (413), UNSUPPORTED_ENCODING (415), VALIDATION_ERROR (400), and INTERNAL_ERROR (500). Never serialize SQL/driver errors or secrets.

## Shared contracts

| File | Main exports |
| --- | --- |
| common.ts | Health/error schemas, UUIDs, ISO dates, money/currency, address, pagination |
| auth.ts | Register/login payloads and public auth response |
| users.ts | Role values, normalized email, public user and profile input |
| products.ts | Category/product input and public product schemas |
| estimates.ts | Appliance inputs, explicit solar assumptions, results, saved estimates |
| orders.ts | Cart items, order creation, statuses, snapshots and order response |
| tickets.ts | Ticket creation, reply input/response, statuses and customer ticket response |

Import from @solara/contracts. DTOs remain distinct from Drizzle rows. Backend timestamps must be serialized explicitly. Strict input contracts reject unknown properties; registration cannot choose a role, and checkout cannot supply prices/totals/user IDs. Customer schemas reject authentication hashes and internal notes.

These are starting contracts for implementation, not working business endpoints. Confirm formula versions, authentication strategy, supported currencies, and status transitions during feature development. Validate every request again on the backend.

## Planned API map

| Resource | Planned path | Intended access |
| --- | --- | --- |
| Authentication | /api/auth/register, /login, /logout, /me | Session flow; not implemented |
| Users | /api/users/me, /api/users/:id | Own profile; admin management |
| Catalog | /api/categories, /api/products, /api/products/:id | Public reads; admin writes |
| Estimates | /api/estimates, /api/estimates/:id | Owner only |
| Orders | /api/orders, /api/orders/:id | Owner reads/creation; admin status changes |
| Support | /api/tickets, /api/tickets/:id, /api/tickets/:id/replies | Owner conversation; admin support |
| Internal notes | /api/tickets/:id/notes | Admin only; separate response contract to be added |

These paths are registered through existing module routes/controllers/services and deliberately return 501 until implemented. Use one /api prefix throughout. GET /api/{auth,users,products,estimates,orders,tickets}/scaffold-status returns only the shared diagnostic response in development; it returns 404 in production/test. This adds no fields to real business contracts. See scaffold-map.md.

## API client

frontend/src/lib/api-client.ts validates successful JSON against the supplied Zod schema and converts non-success responses to ApiError. Pass an AbortSignal through RequestInit for cancellation and JSON.stringify for JSON bodies. Network and cancellation failures propagate. Empty-body/upload APIs require a separate explicit convention if later added.

List endpoints should use the shared pagination input and paginatedSchema response factory. Select only permitted fields rather than relying on validation to sanitize raw database rows.
