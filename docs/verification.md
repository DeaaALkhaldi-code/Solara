# PostgreSQL foundation verification

The earlier foundation verification is superseded by the PostgreSQL checks recorded here.

Verified on 2026-10-16 using Node.js 25.2.1 and npm 11.6.2 on Windows. Node.js 24 LTS remains recommended and is selected by CI.

| Check | Result |
| --- | --- |
| npm run lint | Passed |
| npm run typecheck | Passed; includes backend tools, scripts, tests, and Drizzle configuration |
| npm run build | Passed for contracts, backend, frontend (Webpack) |
| npm run db:generate | Passed; a second generation reports no schema changes |
| npm run db:check | Passed; migration metadata valid |
| npm test | Seven passed; one live-server test skipped locally |
| Embedded PostgreSQL migration | Applied twice successfully against PGlite |
| Relational integrity | Verified unique normalized emails, foreign keys, valid session expiry, enums, stock/price/quantity rules |
| Order history | Verified product changes preserve saved line-item name/price snapshots |
| API contracts | Reject role escalation, client totals/prices, authentication hashes, internal notes, invalid calculator assumptions |
| API integration | Health, JSON errors, body limit, cancellation, inactive routes passed |

The live node-postgres connection/shutdown test requires TEST_DATABASE_URL pointing to a disposable PostgreSQL server. Neither Docker nor PostgreSQL is installed locally, so that test and local Compose startup were not executed here. PGlite validates the SQL in an embedded PostgreSQL engine; it does not verify TCP connectivity, hosted TLS, or Docker operation.

GitHub Actions is configured with PostgreSQL 18 and TEST_DATABASE_URL to run the live-server test, production migrations twice, and seed twice. Its result must be checked separately on GitHub after upload; configuration alone is not proof of a successful CI run.

No production database was connected, converted, reset, or removed. No page/UI implementation, authentication flow, business endpoint, deployment, or business calculator algorithm is included. Default frontend 404 responses remain expected.
