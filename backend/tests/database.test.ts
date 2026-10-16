import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

test("PostgreSQL migrations apply twice and enforce relational invariants", async (context) => {
  const client = new PGlite();
  context.after(() => client.close());
  const db = drizzle(client);
  const options = { migrationsFolder: fileURLToPath(new URL("../drizzle", import.meta.url)) };
  await migrate(db, options);
  await migrate(db, options);

  const tables = await client.query<{ table_name: string }>("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  assert.deepEqual(tables.rows.map((row) => row.table_name).sort(), [
    "categories", "estimate_products", "estimates", "order_items", "orders", "products", "sessions", "ticket_notes", "ticket_replies", "tickets", "users",
  ]);

  const user = await client.query<{ id: string }>("INSERT INTO users (name, email) VALUES ('Customer', 'customer@example.com') RETURNING id");
  const userId = user.rows[0].id;
  await assert.rejects(client.query("INSERT INTO users (name, email) VALUES ('Duplicate', 'customer@example.com')"));
  await assert.rejects(client.query("INSERT INTO users (name, email) VALUES ('Uppercase', 'UPPER@example.com')"));
  await assert.rejects(client.query("INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, 'hash', now() - interval '1 day')", [userId]));

  const category = await client.query<{ id: string }>("INSERT INTO categories (name, slug) VALUES ('Panels', 'panels') RETURNING id");
  const categoryId = category.rows[0].id;
  const product = await client.query<{ id: string }>("INSERT INTO products (category_id, name, slug, description, price_minor, currency) VALUES ($1, 'Panel', 'panel', 'Example', 10000, 'USD') RETURNING id", [categoryId]);
  const productId = product.rows[0].id;
  await assert.rejects(client.query("INSERT INTO products (category_id, name, slug, description, price_minor, currency) VALUES ($1, 'Bad', 'bad', 'Example', -1, 'USD')", [categoryId]));
  await assert.rejects(client.query("UPDATE products SET stock_quantity = -1 WHERE id = $1", [productId]));

  const order = await client.query<{ id: string }>("INSERT INTO orders (user_id, total_minor, currency, contact_name, contact_email, contact_phone, delivery_address) VALUES ($1, 20000, 'USD', 'Customer', 'customer@example.com', '12345', '{}') RETURNING id", [userId]);
  const orderId = order.rows[0].id;
  await client.query("INSERT INTO order_items (order_id, product_id, product_name, unit_price_minor, quantity) VALUES ($1, $2, 'Panel at order time', 10000, 2)", [orderId, productId]);
  await client.query("UPDATE products SET name = 'Changed', price_minor = 15000 WHERE id = $1", [productId]);
  const snapshot = await client.query<{ product_name: string; unit_price_minor: number }>("SELECT product_name, unit_price_minor FROM order_items WHERE order_id = $1", [orderId]);
  assert.deepEqual(snapshot.rows[0], { product_name: "Panel at order time", unit_price_minor: 10000 });
  await assert.rejects(client.query("DELETE FROM products WHERE id = $1", [productId]));
  await assert.rejects(client.query("DELETE FROM users WHERE id = $1", [userId]));
  await assert.rejects(client.query("UPDATE orders SET status = 'invalid' WHERE id = $1", [orderId]));
});
