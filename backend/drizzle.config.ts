import { defineConfig } from "drizzle-kit";
import { databaseUrlSchema } from "./src/config/env.js";

// Generating SQL does not require a live database or an environment file.
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  ...(process.env.DATABASE_URL ? { dbCredentials: { url: databaseUrlSchema.parse(process.env.DATABASE_URL) } } : {}),
});
