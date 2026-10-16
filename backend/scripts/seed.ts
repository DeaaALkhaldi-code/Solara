import { connectDatabase, disconnectDatabase, getDatabase } from "../src/config/database.js";
import { readDatabaseUrl } from "../src/config/env.js";
import { categories } from "../src/db/schema.js";

async function main() {
  try {
    await connectDatabase(readDatabaseUrl());
    await getDatabase().insert(categories).values([
      { name: "Solar panels", slug: "solar-panels" },
      { name: "Inverters", slug: "inverters" },
      { name: "Batteries", slug: "batteries" },
      { name: "Accessories", slug: "accessories" },
    ]).onConflictDoNothing({ target: categories.slug });
    console.info("Reference categories seeded. No user accounts or credentials were created.");
  } finally {
    await disconnectDatabase();
  }
}

main().catch(() => {
  console.error("Seed failed. Check DATABASE_URL and apply migrations first.");
  process.exitCode = 1;
});
