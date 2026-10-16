import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema.js";
import { logger } from "../lib/logger.js";

let pool: Pool | undefined;
let database: NodePgDatabase<typeof schema> | undefined;

export async function connectDatabase(connectionString: string) {
  if (pool) return;
  const nextPool = new Pool({ connectionString, max: 10, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 });
  nextPool.on("error", () => logger.error("An idle PostgreSQL connection failed."));
  try {
    await nextPool.query("SELECT 1");
    database = drizzle(nextPool, { schema });
    pool = nextPool;
  } catch (error) {
    await nextPool.end();
    throw error;
  }
}

export function getDatabase() {
  if (!database) throw new Error("PostgreSQL has not been connected.");
  return database;
}

export async function disconnectDatabase() {
  const currentPool = pool;
  pool = undefined;
  database = undefined;
  await currentPool?.end();
}
