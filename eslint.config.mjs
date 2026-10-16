import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["**/node_modules/**", "**/.next/**", "**/dist/**", "**/next-env.d.ts", "docs/archive/**"]),
  ...nextVitals.map((config) => ({ ...config, files: ["frontend/**/*.{js,jsx,ts,tsx,mjs}"] })),
  ...nextTypescript.map((config) => ({ ...config, files: ["frontend/**/*.{js,jsx,ts,tsx,mjs}"] })),
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ["backend/**/*.ts", "packages/**/*.ts"] })),
  {
    files: ["frontend/src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{
        group: ["**/backend/**", "@solara/backend", "@solara/backend/*", "mongoose", "mongoose/*", "express", "dotenv", "dotenv/*"],
        message: "Frontend code must call the API rather than import backend infrastructure.",
      }] }],
    },
  },
  {
    files: ["packages/contracts/src/**/*.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{
        group: ["node:*", "**/backend/**", "mongoose", "mongoose/*", "express", "dotenv", "dotenv/*"],
        message: "Shared contracts must remain browser-safe.",
      }] }],
    },
  },
  { settings: { next: { rootDir: "frontend/" } } },
]);
