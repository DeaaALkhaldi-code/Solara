# Architecture

One repository with npm workspaces: a Next.js frontend, an Express backend, and shared Zod contracts. PostgreSQL is accessed only by the backend through Drizzle ORM and the pg connection pool.

## Frameworks and boundaries

- Frontend: Next.js App Router, React, TypeScript, Tailwind v4, Base UI, React Hook Form, Zod resolvers, and Motion. Libraries are installed; page/UI implementations are intentionally absent.
- Backend: Express, TypeScript, Zod, Drizzle ORM, and node-postgres.
- Contracts: browser-safe request/response schemas, UUIDs, ISO dates, currency/money conventions, roles, and statuses.
- Database: 11 relational tables with SQL migrations, foreign keys, indexes, and check constraints.
- Tooling: npm workspaces, TypeScript, ESLint import boundaries, Docker Compose, and GitHub Actions CI.

No frontend or contracts code imports pg, Drizzle, or backend source. Next.js server-rendered pages may fetch Express; browser components use the typed API client. Express is the sole business API.

## Backend organization

Route -> authentication/authorization -> validation -> controller -> service -> Drizzle -> PostgreSQL.

Routes register middleware and endpoints. Controllers translate HTTP. Services implement business rules, explicit response mapping, owner-scoped queries, and database transactions. Tables live in src/db/schema.ts; infer internal types from Drizzle rather than duplicating model classes.

app.ts is testable without PostgreSQL. server.ts validates configuration, verifies the connection with SELECT 1, then listens. It closes the server and pool on shutdown. JSON requests are limited to 100 KiB. Errors never expose SQL, connection URLs, or stack traces.

## Database lifecycle

Schema edits -> npm run db:generate -> review SQL -> commit migrations and metadata -> npm run db:migrate.

SQL generation and migration history checks do not require a live DB. Migrations use the configured DATABASE_URL and a migration journal to avoid replaying already-applied changes. Application startup never migrates or seeds. Production migration execution uses compiled code and requires backend/drizzle/ to be deployed with backend/dist/.

The local Compose service binds PostgreSQL to 127.0.0.1 and persists data in a named volume. The sample password is local-only. Never disable TLS certificate verification for hosted PostgreSQL; use provider-approved connection settings.

## Authentication foundation

Users and hashed-token session storage are defined; auth flows remain unimplemented. Registration inputs cannot set roles. Public user DTOs reject passwordHash. Session tokens/passwords must be securely generated/hashed by the future auth feature; the table definitions alone provide no authentication.

Before mounting private routes, implement session verification (401), role checks (403), owner-scoped queries, secure HttpOnly cookies, expiration/revocation, and CSRF protection for cookie-based mutations. Configure credentialed CORS and client credentials together. Current CORS permits the configured frontend origin without credentials. CORS is not authorization.

## Frontend and deployment

Empty app directories are route reservations, not live URLs. The root layout and Tailwind entry point are the only app framework files. Current responses are default 404 until page.tsx files are added. Feature READMEs describe where components, hooks, and API functions will go.

Both apps and contracts use ESM. Backend uses NodeNext and explicit .js relative imports; tsx handles development. Contracts compile first; root dev commands watch their output. Next.js uses Webpack because Turbopack's CSS worker failed on the setup machine.

Prefer one production public origin forwarding /api to Express. NEXT_PUBLIC_API_URL must be a browser-reachable URL supplied at frontend build time; it contains no credentials. An internal server-only API URL can be added later if deployment requires it.

No payments, file uploads, email automation, scheduling, page codes, or business endpoints have been implemented.
