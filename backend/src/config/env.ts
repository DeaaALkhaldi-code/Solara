import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { z } from "zod";

config({ path: fileURLToPath(new URL("../../.env", import.meta.url)), quiet: true });

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  MONGODB_URI: z.string().regex(/^mongodb(?:\+srv)?:\/\/.+/, "A MongoDB connection URI is required"),
  FRONTEND_ORIGIN: z.url().refine((value) => {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) && parsed.origin === value;
  }, "Use an HTTP(S) origin without a path or trailing slash"),
});

export class ConfigurationError extends Error {
  constructor(fields: string) {
    super(`Invalid backend configuration: ${fields}. See backend/.env.example.`);
    this.name = "ConfigurationError";
  }
}

export function readEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new ConfigurationError(fields);
  }
  return parsed.data;
}
