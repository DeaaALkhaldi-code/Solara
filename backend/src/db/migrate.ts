import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { connectDatabase, disconnectDatabase, getDatabase } from "../config/database.js";
import { readDatabaseUrl } from "../config/env.js";
import { logger } from "../lib/logger.js";

async function main() {
  try {
    await connectDatabase(readDatabaseUrl());
    await migrate(getDatabase(), { migrationsFolder: fileURLToPath(new URL("../../drizzle", import.meta.url)) });
    logger.info("PostgreSQL migrations applied.");
  } finally {
    await disconnectDatabase();
  }
}

main().catch(() => {
  logger.error("Migration failed. Check DATABASE_URL and PostgreSQL availability; no automatic reset was attempted.");
  process.exitCode = 1;
});
