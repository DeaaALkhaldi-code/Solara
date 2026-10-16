# users frontend feature

Customer profile and admin user management.

The components/users-scaffold.tsx entry point composes a shared placeholder and passes its typed api.ts diagnostic function. Implement feature components/hooks inside these existing folders. Keep route files thin and use the existing API client and @solara/contracts for future business requests.

Use React Hook Form with @hookform/resolvers/zod for forms, Base UI/Tailwind for shared UI, and Motion when animation is needed. Shared generic elements belong in src/components/. Pages contain placeholders only; business feature implementation remains TODO. Never import backend source or database libraries.
