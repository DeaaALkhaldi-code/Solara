# Architecture

One repository, two applications, one shared contracts workspace. npm owns a single root lockfile.

## Boundaries and builds

Frontend owns rendering and interactions. Backend owns Express endpoints, validation, authorization, business operations, and Mongoose. Contracts contain browser-safe Zod schemas and inferred API types. Frontend imports from backend source are prohibited. There are no Next.js business API routes or Server Actions.

Backend NodeNext ESM uses explicit `.js` relative import paths: tsx resolves TypeScript in development, and Node runs emitted JavaScript in production. Contracts compile to JavaScript and declarations before consumers build. Next.js uses bundler resolution and transpiles the workspace. Root dev commands build contracts first, then watch all necessary workspaces; backend tsx watches contracts/dist.

Only the root HTML layout and Tailwind entry point are implemented. Future route folders are empty and return 404. Add page.tsx and nested layouts during feature implementation. Do not invent pass-through layouts or business placeholders to fill the tree.

## Backend flow

Route -> authentication/authorization -> Zod validation -> controller -> service -> Mongoose.

Routes register HTTP behavior; controllers translate HTTP input/output; services own business rules and database queries; models define documents and indexes. Extra repository or dependency-injection layers are unnecessary.

app.ts is testable without MongoDB. server.ts validates configuration, connects before listening, handles startup failure, and closes HTTP/database connections on SIGINT/SIGTERM with a deadline. JSON is limited to 100 KiB. Unexpected errors never serialize stack traces or connection URIs.

## Authentication plan (not implemented)

Choose a maintained Express-compatible authentication/session solution before adding auth endpoints. A future authenticate middleware must validate the session and provide a typed identity (user ID and role), returning 401 for missing/invalid credentials. authorize must enforce allowed roles and return 403. Services must scope private queries by the authenticated owner. Never trust a submitted user ID or role. No stub currently permits access.

Plan HttpOnly cookies, Secure production transport, expiration/revocation, CSRF checks for cookie-authenticated mutations, credentialed CORS, and client credential settings together. Current CORS uses the configured frontend origin without enabling credentials before auth is designed. CORS is not authorization.

For deployment, prefer one public origin forwarding /api to Express. Examples use a direct public API URL for local development; provide a browser-reachable HTTPS URL at frontend build time for deployment. NEXT_PUBLIC values are public and embedded at build time. Add an internal server-only API URL later only if topology requires it.

## Reserved areas

Frontend: auth, users, home, calculator, catalog, cart, orders, support. Backend: auth, users, products, estimates, orders, tickets. Administrative screens will call these same modules with backend role checks.

No business features, payments, uploads, email automation, scheduling, or advanced inventory handling. Empty scripts/E2E folders have no runnable commands until implemented.
