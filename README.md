# Solara

Solar-energy platform foundation: Next.js frontend, Express API, MongoDB/Mongoose, and shared Zod contracts in an npm workspace monorepo.

## Current status

Framework and infrastructure only. The source repository contained only this README before scaffolding; there were no components, assets, AGENTS.md instructions, or prototypes to migrate.

- Next.js App Router, React, TypeScript, Tailwind CSS v4, and Base UI dependency.
- Express, validated environment configuration, MongoDB connection, bounded JSON parsing, CORS, common errors, and graceful shutdown.
- Shared compiled ESM contracts consumed by both applications.
- Typed frontend API client and infrastructure integration tests.
- Empty tracked folders for planned routes, UI components, features, and backend modules.

**No page implementations, authentication, business endpoints, database models, or design components are included.** The only app component is the framework-required root layout. Route directories contain `.gitkeep`, not `page.tsx`, so the frontend intentionally serves Next.js's default 404 until pages are implemented. Empty folders do not create routes or access protection. There is no frontend health widget; the API client is verified in the integration test.

## Requirements and setup

Use Node.js 24 LTS (`.nvmrc`), minimum 22.12, and npm 10+. Backend startup requires a local MongoDB instance or an Atlas connection URI.

Run from the repository root:

```sh
npm ci
```

Copy the environment examples (PowerShell):

```powershell
Copy-Item frontend/.env.example frontend/.env.local
Copy-Item backend/.env.example backend/.env
```

Set `MONGODB_URI` to your development database. Never commit environment files or put secrets in `NEXT_PUBLIC_` variables.

Next.js loads its standard environment files inside `frontend/`, including `.env.local`. The backend explicitly loads `backend/.env` relative to its entry module in development and compiled production output. Existing process environment variables take priority. Contracts load no environment files.

Next.js development and production builds explicitly use Webpack. Turbopack's CSS worker failed on the setup machine; Webpack compiled the same framework foundation successfully. Both remain standard Next.js bundlers.

```sh
npm run dev
```

Frontend: `http://localhost:3000` (default 404, intentionally). API: `http://localhost:4000/api/health`.

If MongoDB is unavailable, the backend fails startup. Use `npm run dev:frontend` to work on the frontend independently.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Build contracts, then watch contracts and run both applications |
| `npm run dev:frontend` | Build/watch contracts and run Next.js |
| `npm run dev:backend` | Build/watch contracts and run Express; requires MongoDB |
| `npm run typecheck` | Build contracts and type-check every workspace |
| `npm run lint` | Lint active frontend, backend, and contract code |
| `npm test` | Verify API/client integration and configuration without MongoDB |
| `npm run build` | Build contracts, backend, then frontend |
| `npm start` | Start both production applications after building |
| `npm run start:frontend` | Start the production frontend |
| `npm run start:backend` | Start the production backend |

Use one root lockfile. Install dependencies from the root with `npm install <package> -w @solara/frontend` (or the relevant workspace). Root scripts build contracts before dependent apps. Use `npm ci` for reproducible installs.

## Structure

```text
frontend/
  public/{images,models}/
  src/
    app/                 Root layout, Tailwind entry point, empty route folders
    features/            auth, users, home, calculator, catalog, cart, orders, support
    components/          ui, layout, motion
    lib/                 API client, shared UI class utility
backend/
  src/
    config/              Environment and MongoDB connection
    modules/             auth, users, products, estimates, orders, tickets
    middleware/          Request validation and error handling
    lib/                 HTTP errors and minimal logging
    app.ts               Express setup, independently testable
    server.ts            Database connection, startup, and shutdown
  tests/                 Infrastructure integration checks
  scripts/               Reserved for future database scripts
packages/contracts/      Browser-safe Zod contracts, inferred types, statuses
docs/                    Architecture, initial database design, API conventions
tests/e2e/               Reserved; no E2E runner or fake test command
```

## Conventions

Keep future route files focused on page composition. Feature-specific components, hooks, and HTTP calls belong in `frontend/src/features/<feature>/`. Generic primitives belong in `components/ui`. Base UI is installed, but no UI components have been invented. `@/*` maps to `frontend/src/*`.

For a backend module, add `<module>.routes.ts`, `<module>.controller.ts`, `<module>.service.ts`, and `<module>.model.ts` only when needed. There are no fake implementations or mounted unfinished routes. Implement authentication and authorization before mounting private endpoints.

Import shared schemas and inferred types from `@solara/contracts`. ESM exports point to `dist/`, built with TypeScript NodeNext. The contracts watcher updates compiled files; Next.js observes the workspace dependency, and the backend watcher includes contract output. Contracts contain no models, database connections, or secrets. Backend validation remains mandatory.

Express owns the application API. Next.js server-rendered pages may fetch Express; browser components use the frontend API client. Neither imports backend source or accesses MongoDB. No duplicate business APIs through Next.js Route Handlers or Server Actions.

`docs/archive/` is reserved for historical documentation or prototypes and is excluded from linting. It currently contains no historical files. Keep prototypes outside the active application and `public/`.

See [architecture](docs/architecture.md), [database plan](docs/database.md), and [API contracts](docs/api-contracts.md).
