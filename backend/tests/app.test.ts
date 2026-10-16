import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { createApp } from "../src/app.js";
import { envSchema } from "../src/config/env.js";
import { apiErrorSchema } from "@solara/contracts";
import { ApiError, getHealth } from "../../frontend/src/lib/api-client.js";

test("API foundation and frontend client work together without a database", async (context) => {
  const server = createApp("http://localhost:3000").listen(0, "127.0.0.1");
  await once(server, "listening");
  context.after(() => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}/api`;
  const previousUrl = process.env.NEXT_PUBLIC_API_URL;
  process.env.NEXT_PUBLIC_API_URL = baseUrl;
  context.after(() => {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_API_URL;
    else process.env.NEXT_PUBLIC_API_URL = previousUrl;
  });

  assert.deepEqual(await getHealth(), { status: "ok" });
  const health = await fetch(`${baseUrl}/health`, { headers: { Origin: "http://localhost:3000" } });
  assert.equal(health.headers.get("access-control-allow-origin"), "http://localhost:3000");
  assert.equal(health.headers.get("x-powered-by"), null);

  const malformed = await fetch(`${baseUrl}/health`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
  });
  assert.equal(malformed.status, 400);
  assert.equal(apiErrorSchema.parse(await malformed.json()).error.code, "INVALID_JSON");

  const oversized = await fetch(`${baseUrl}/health`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "x".repeat(110000) }),
  });
  assert.equal(oversized.status, 413);
  assert.equal(apiErrorSchema.parse(await oversized.json()).error.code, "PAYLOAD_TOO_LARGE");

  const businessRoute = await fetch(`${baseUrl}/orders`);
  assert.equal(businessRoute.status, 404);
  assert.equal(apiErrorSchema.parse(await businessRoute.json()).error.code, "NOT_FOUND");

  process.env.NEXT_PUBLIC_API_URL = `${baseUrl}/missing`;
  await assert.rejects(getHealth(), (error: unknown) => error instanceof ApiError && error.status === 404);
  process.env.NEXT_PUBLIC_API_URL = baseUrl;
  const abort = new AbortController();
  abort.abort();
  await assert.rejects(getHealth(abort.signal), { name: "AbortError" });
});

test("environment validation rejects missing database configuration and invalid origins", () => {
  assert.equal(envSchema.safeParse({}).success, false);
  assert.equal(envSchema.safeParse({
    DATABASE_URL: "mongodb://127.0.0.1:27017/solara",
    FRONTEND_ORIGIN: "http://localhost:3000",
  }).success, false);
  assert.equal(envSchema.safeParse({
    DATABASE_URL: "postgresql://solara:local@127.0.0.1:5432/solara",
    FRONTEND_ORIGIN: "http://localhost:3000/path",
  }).success, false);
  assert.equal(envSchema.parse({
    DATABASE_URL: "postgresql://solara:local@127.0.0.1:5432/solara",
    FRONTEND_ORIGIN: "http://localhost:3000",
  }).PORT, 4000);
});
