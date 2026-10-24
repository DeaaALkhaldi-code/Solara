# Support frontend feature

The `/support` route renders `components/SupportPage.tsx`. The page, its form, ticket tracker, animation, styles, sample data, and types live in this feature folder.

The request form and ticket tracker are frontend demos. A submission creates a reference only in the current browser session; attachments are not uploaded. The sample ticket is stored in `support.data.ts`. No support API request, database write, or maintenance booking happens here.

`api.ts` and `components/support-scaffold.tsx` remain from the connected scaffold for future API integration. Implement real requests through the frontend API client and `@solara/contracts`, without importing backend source into the frontend.
