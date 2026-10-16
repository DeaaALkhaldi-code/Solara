import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql } from "drizzle-orm";
import { connectDatabase, disconnectDatabase, getDatabase } from "../src/config/database.js";

// Opt in only with a disposable test database: this test applies migrations.
test("node-postgres connection, migrations, and shutdown against a PostgreSQL server", {
  skip: !process.env.TEST_DATABASE_URL && "Set TEST_DATABASE_URL to a disposable PostgreSQL database.",
}, async () => {
  try {
    await connectDatabase(process.env.TEST_DATABASE_URL!);
    const db = getDatabase();
    const options = { migrationsFolder: fileURLToPath(new URL("../drizzle", import.meta.url)) };
    await migrate(db, options);
    await migrate(db, options);
    const result = await db.execute<{ value: number }>(sql`select 1::int as value`);
    assert.equal(result.rows[0].value, 1);
  } finally {
    await disconnectDatabase();
  }
  assert.throws(() => getDatabase(), /has not been connected/);
});
