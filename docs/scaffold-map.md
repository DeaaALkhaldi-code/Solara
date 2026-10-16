# Connected scaffold map

All paths below are relative to the repository root. Only placeholders are implemented. A connected indicator confirms transport to a development scaffold, not a working business feature.

| Feature | Page files under frontend/src/app/ | Frontend API | Backend routes / controller / service |
| --- | --- | --- | --- |
| home | `(website)/page.tsx` | `frontend/src/features/home/api.ts` | `backend/src/modules/products/products.routes.ts`<br>`backend/src/modules/products/products.controller.ts`<br>`backend/src/modules/products/products.service.ts` |
| auth | `(auth)/login/page.tsx`<br>`(auth)/register/page.tsx` | `frontend/src/features/auth/api.ts` | `backend/src/modules/auth/auth.routes.ts`<br>`backend/src/modules/auth/auth.controller.ts`<br>`backend/src/modules/auth/auth.service.ts` |
| users | `account/page.tsx`<br>`account/profile/page.tsx`<br>`admin/page.tsx`<br>`admin/users/page.tsx`<br>`admin/users/[id]/page.tsx` | `frontend/src/features/users/api.ts` | `backend/src/modules/users/users.routes.ts`<br>`backend/src/modules/users/users.controller.ts`<br>`backend/src/modules/users/users.service.ts` |
| calculator | `(website)/calculator/page.tsx`<br>`account/estimates/page.tsx` | `frontend/src/features/calculator/api.ts` | `backend/src/modules/estimates/estimates.routes.ts`<br>`backend/src/modules/estimates/estimates.controller.ts`<br>`backend/src/modules/estimates/estimates.service.ts` |
| catalog | `(website)/catalog/page.tsx`<br>`(website)/catalog/[slug]/page.tsx`<br>`admin/categories/page.tsx`<br>`admin/products/page.tsx`<br>`admin/products/new/page.tsx`<br>`admin/products/[id]/page.tsx` | `frontend/src/features/catalog/api.ts` | `backend/src/modules/products/products.routes.ts`<br>`backend/src/modules/products/products.controller.ts`<br>`backend/src/modules/products/products.service.ts` |
| cart | `(website)/cart/page.tsx` | `frontend/src/features/cart/api.ts` | `backend/src/modules/orders/orders.routes.ts`<br>`backend/src/modules/orders/orders.controller.ts`<br>`backend/src/modules/orders/orders.service.ts` |
| orders | `(website)/checkout/page.tsx`<br>`account/orders/page.tsx`<br>`account/orders/[id]/page.tsx`<br>`admin/orders/page.tsx`<br>`admin/orders/[id]/page.tsx` | `frontend/src/features/orders/api.ts` | `backend/src/modules/orders/orders.routes.ts`<br>`backend/src/modules/orders/orders.controller.ts`<br>`backend/src/modules/orders/orders.service.ts` |
| support | `(website)/support/page.tsx`<br>`account/tickets/page.tsx`<br>`account/tickets/[id]/page.tsx`<br>`admin/tickets/page.tsx`<br>`admin/tickets/[id]/page.tsx` | `frontend/src/features/support/api.ts` | `backend/src/modules/tickets/tickets.routes.ts`<br>`backend/src/modules/tickets/tickets.controller.ts`<br>`backend/src/modules/tickets/tickets.service.ts` |

Each thin page composes its feature's `components/<feature>-scaffold.tsx`. That component supplies its API function to `frontend/src/components/ui/scaffold-page.tsx`, which shows loading, connected, or connection-error states. The root navigation includes all pages and example detail URLs; those examples never load records.

## Connection and environment rules

- Development status routes: GET /api/{auth,users,products,estimates,orders,tickets}/scaffold-status.
- Responses use the separate scaffoldStatusSchema: module, status="scaffold", implemented=false. Real business contracts are unchanged.
- Only NODE_ENV=development enables backend status routes. Test/production return 404. createApp defaults to production unless an environment is explicitly passed; server.ts passes validated NODE_ENV.
- Frontend status requests run only in development. Production pages display that checks are development-only and make no status requests.
- Set frontend/.env.local NEXT_PUBLIC_API_URL to the backend URL (the existing example uses http://localhost:4000/api). Start the existing database/backend/frontend commands from README. If the backend is unavailable, placeholders show a connection error.
- Home/catalog reuse the products module. Cart reuses the orders diagnostic but its state remains a frontend TODO. Account/admin reuse existing modules; no new backend module has been introduced.

## Business and access rules

The planned auth, users, products/categories, estimates, orders, and tickets routes are mounted through their existing modules. Every registered business operation calls a TODO service that throws HTTP 501 with code NOT_IMPLEMENTED. Unknown URLs still return 404. No operation creates cookies, sessions, records, calculations, orders, or replies.

Account/admin pages are publicly readable placeholder text only. They load no private data, grant no permissions, and explicitly label authentication/authorization as pending. Implement server-side session verification, role checks, ownership checks, request validation, and explicit DTO mapping before replacing any 501 handler with business code. A visible admin placeholder is not an access-control implementation.

Remaining implementation TODOs:

- home: Homepage content and approved sections.
- auth: Registration/login, password hashing, secure sessions, and logout.
- users: Verified identity, owner-scoped profile operations, administrator authorization.
- calculator: Validated inputs, versioned formulas, saved estimates, and recommendations.
- catalog: Product/category queries, validated admin writes, and catalog UI.
- cart: Client-side cart state and validated checkout handoff.
- orders: Authenticated order creation, transactions, prices, snapshots, stock, and status transitions.
- support: Ticket ownership, replies, authorized status changes, separate internal notes.

## Verification (2026-10-17)

Existing lint, typecheck, tests, and production build passed. Local tests: 10 passed, one live PostgreSQL test skipped because TEST_DATABASE_URL is not configured. The database schema, migrations, dependencies, and tooling were not changed.

All eight frontend API functions were exercised against the Express scaffold with real HTTP requests, including cancellation and non-success handling. Tests cover status 404 outside development and 501 responses for every registered business placeholder in development and production. Browser checks observed loading, connected, and connection-error states, plus account/admin access notices. All 27 planned production URLs returned 200 with TODOs and diagnostics disabled.

Browser diagnostics used a temporary scaffold-only Express app without connecting to a database. Full database-backed startup was not tested locally; the existing opt-in PostgreSQL test and CI remain in place.
