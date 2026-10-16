# cart frontend feature

Client cart state, quantities, and checkout handoff.

Reserved components/ and hooks/ folders are intentionally empty. Add cart.api.ts for feature HTTP functions when needed, using ../../lib/api-client and schemas from @solara/contracts. Route files under src/app should compose feature components rather than contain business logic.

Use React Hook Form with @hookform/resolvers/zod for forms, Base UI/Tailwind for shared UI, and Motion when animation is needed. Shared generic elements belong in src/components/. No page or feature implementation is included. Never import backend source or database libraries.
