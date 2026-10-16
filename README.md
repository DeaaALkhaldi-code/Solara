# Solara

Solar-energy platform foundation: Next.js frontend, Express API, PostgreSQL with Drizzle ORM, and shared Zod contracts in an npm workspace monorepo.

## Current status

Framework and infrastructure only. The source repository contained only this README before scaffolding; there were no components, assets, AGENTS.md instructions, or prototypes to migrate.

- Next.js App Router, React, TypeScript, Tailwind CSS v4, Base UI, React Hook Form, Zod form resolvers, and Motion dependencies.
- Express, validated environment configuration, a node-postgres connection pool, bounded JSON parsing, CORS, common errors, and graceful shutdown.
- Drizzle schema, versioned SQL migration, and constraints/indexes for 11 PostgreSQL tables.
- Shared compiled ESM request/response contracts for all planned feature areas.
- Typed frontend API client, PostgreSQL migration/contract tests, and GitHub Actions CI with PostgreSQL.
- Connected placeholder pages, minimal navigation, per-feature API functions, and backend module routes/controllers/services.

**Connected scaffold only: no real authentication, CRUD, calculation, order, or support workflows are implemented.** Planned pages now contain titles, purpose descriptions, and TODOs. Development-only status endpoints drive loading/connected/error indicators through each feature's API file. Registered business operations return HTTP 501. Account/admin pages show no private data and explicitly mark authentication/authorization as pending. See [the feature-to-file map](docs/scaffold-map.md).

## Requirements and setup

Use Node.js 24 LTS (`.nvmrc`), minimum 22.12, and npm 10+. Backend startup requires PostgreSQL 18 (the local/CI target); Docker with Compose is optional if you already have a PostgreSQL server.

Run from the repository root:

```sh
npm ci
```

Copy the environment examples (PowerShell):

```powershell
Copy-Item frontend/.env.example frontend/.env.local
Copy-Item backend/.env.example backend/.env
```

Set `DATABASE_URL` to your development PostgreSQL database. The example matches the local Docker service. Its sample password is for local development only. Never commit real environment files or put secrets in `NEXT_PUBLIC_` variables.

Start the local database, apply migrations, and seed reference categories:

```sh
npm run db:up
npm run db:migrate
npm run db:seed
```

If using an existing PostgreSQL server, create an empty `solara` database, configure `DATABASE_URL`, and skip `db:up`. Migrations are explicit and never run automatically at application startup. No existing database data is converted or removed.

Next.js loads its standard environment files inside `frontend/`, including `.env.local`. The backend explicitly loads `backend/.env` relative to its entry module in development and compiled production output. Existing process environment variables take priority. Contracts load no environment files.

Next.js development and production builds explicitly use Webpack. Turbopack's CSS worker failed on the setup machine; Webpack compiled the same framework foundation successfully. Both remain standard Next.js bundlers.

```sh
npm run dev
```

Frontend: `http://localhost:3000` (connected placeholders with navigation). API: `http://localhost:4000/api/health`.

If PostgreSQL is unavailable, the backend fails startup. Use `npm run dev:frontend` to work on the frontend independently. `npm run db:down` stops the local database without deleting its named data volume.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Build contracts, then watch contracts and run both applications |
| `npm run dev:frontend` | Build/watch contracts and run Next.js |
| `npm run dev:backend` | Build/watch contracts and run Express; requires PostgreSQL |
| `npm run typecheck` | Build contracts and type-check every workspace |
| `npm run lint` | Lint active frontend, backend, and contract code |
| `npm test` | Verify API/client, contracts, and migrations in embedded PostgreSQL; server test is opt-in |
| `npm run build` | Build contracts, backend, then frontend |
| `npm start` | Start both production applications after building |
| `npm run start:frontend` | Start the production frontend |
| `npm run start:backend` | Start the production backend |
| `npm run db:up` / `npm run db:down` | Start/stop local PostgreSQL using Docker Compose |
| `npm run db:generate` | Generate SQL after editing the Drizzle schema; no live DB needed |
| `npm run db:check` | Validate migration history metadata; no live DB needed |
| `npm run db:migrate` | Apply committed SQL migrations to DATABASE_URL |
| `npm run db:migrate:production` | Apply migrations from compiled backend code after building |
| `npm run db:seed` | Idempotently insert four reference categories; creates no users |
| `npm run db:studio` | Open Drizzle's local database browser using DATABASE_URL |

Use one root lockfile. Install dependencies from the root with `npm install <package> -w @solara/frontend` (or the relevant workspace). Root scripts build contracts before dependent apps. Use `npm ci` for reproducible installs.

## Structure

```text
frontend/
  public/{images,models}/
  src/
    app/                 Thin placeholder pages, root layout, Tailwind entry point
    features/            auth, users, home, calculator, catalog, cart, orders, support
    components/          ui, layout, motion
    lib/                 API client, shared UI class utility
backend/
  src/
    config/              Environment and PostgreSQL connection pool
    db/                  Drizzle table schema and migration entry point
    modules/             auth, users, products, estimates, orders, tickets
    middleware/          Request validation and error handling
    lib/                 HTTP errors and minimal logging
    app.ts               Express setup, independently testable
    server.ts            Database connection, startup, and shutdown
  drizzle/               Committed SQL migration, snapshot, journal
  tests/                 API, contracts, embedded PostgreSQL, opt-in server checks
  scripts/               Reference-category seed script
packages/contracts/      Auth, users, products, estimates, orders, tickets, common DTOs
docs/                    Architecture, initial database design, API conventions
tests/e2e/               Reserved; no E2E runner or fake test command
.github/workflows/ci.yml  Lint, types, tests, build, PostgreSQL migration/seed checks
compose.yaml             Local PostgreSQL 18 with persistent data volume
```

## Conventions

Keep future route files focused on page composition. Feature-specific components, hooks, and HTTP calls belong in `frontend/src/features/<feature>/`. Generic primitives belong in `components/ui`. Base UI is installed, but no UI components have been invented. `@/*` maps to `frontend/src/*`.

Backend modules now include `<module>.routes.ts`, `<module>.controller.ts`, and `<module>.service.ts` connected through Express. Relational tables live centrally in `backend/src/db/schema.ts`, with database types inferred from Drizzle rather than separate model files. Each module README documents its boundary. Business handlers explicitly return 501 until implemented. Implement authentication, authorization, and ownership checks before returning any private data or performing writes.

Import shared schemas and inferred types from `@solara/contracts`. ESM exports point to `dist/`, built with TypeScript NodeNext. The contracts watcher updates compiled files; Next.js observes the workspace dependency, and the backend watcher includes contract output. Contracts contain no models, database connections, or secrets. Backend validation remains mandatory.

Express owns the application API. Next.js server-rendered pages may fetch Express; browser components use the frontend API client. Neither imports backend source or accesses PostgreSQL. No duplicate business APIs through Next.js Route Handlers or Server Actions.

For production: install/build with development tooling, apply migrations once using `npm run db:migrate:production`, then start the built applications with `npm start`. Preserve `backend/drizzle/` alongside backend build output and the compiled contracts package. The root process runner is a production dependency; individual workspace start commands are also available. Production connection credentials and TLS must be supplied by the deployment environment. No deployment is configured or executed here.

Tests use disposable embedded PostgreSQL via PGlite and require no local DB. Set `TEST_DATABASE_URL` only to a disposable server database to opt into the live node-postgres connection/migration test. CI supplies a PostgreSQL service, tests both adapters, applies production migrations twice, and seeds twice. Do not point the test URL at production.

`docs/archive/` is reserved for historical documentation or prototypes and is excluded from linting. It currently contains no historical files. Keep prototypes outside the active application and `public/`.

See [architecture](docs/architecture.md), [database plan](docs/database.md), and [API contracts](docs/api-contracts.md).
