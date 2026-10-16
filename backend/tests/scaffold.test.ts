import assert from "node:assert/strict";
import { once } from "node:events";
import { test, type TestContext } from "node:test";
import { apiErrorSchema, scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { createApp } from "../src/app.js";
import { ApiError } from "../../frontend/src/lib/api-client.js";

async function start(context: TestContext, environment?: "development" | "test" | "production") {
  const server = createApp("http://localhost:3000", environment).listen(0, "127.0.0.1");
  await once(server, "listening");
  context.after(() => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}/api`;
}

test("every frontend feature API connects to its development scaffold through the existing client", async (context) => {
  const baseUrl = await start(context, "development");
  const previous = process.env.NEXT_PUBLIC_API_URL;
  process.env.NEXT_PUBLIC_API_URL = baseUrl;
  context.after(() => {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_API_URL;
    else process.env.NEXT_PUBLIC_API_URL = previous;
  });
  const features = { home: "products", auth: "auth", users: "users", calculator: "estimates", catalog: "products", cart: "orders", orders: "orders", support: "tickets" } as const;
  for (const [feature, module] of Object.entries(features)) {
    // Dynamic URL keeps frontend bundler-resolution files out of the backend's NodeNext source graph.
    // Each imported function still executes a real HTTP request and shared response validation.
    const exports = await import(new URL(`../../frontend/src/features/${feature}/api.ts`, import.meta.url).href) as Record<string, (signal?: AbortSignal) => Promise<ScaffoldStatus>>;
    const load = exports[`get${feature[0].toUpperCase() + feature.slice(1)}ScaffoldStatus`];
    assert.deepEqual(await load(), { module, status: "scaffold", implemented: false });
    const abort = new AbortController();
    abort.abort();
    await assert.rejects(load(abort.signal), { name: "AbortError" });
    process.env.NEXT_PUBLIC_API_URL = `${baseUrl}/missing`;
    await assert.rejects(load(), (error: unknown) => error instanceof ApiError && error.status === 404);
    process.env.NEXT_PUBLIC_API_URL = baseUrl;
  }
  assert.equal(scaffoldStatusSchema.safeParse({ module: "auth", status: "scaffold", implemented: true }).success, false);
});

test("scaffold status is hidden in production, test mode, and the fail-closed factory default", async (context) => {
  for (const environment of ["production", "test", undefined] as const) {
    const baseUrl = await start(context, environment);
    for (const module of ["auth", "users", "products", "estimates", "orders", "tickets"]) {
      const response = await fetch(`${baseUrl}/${module}/scaffold-status`);
      assert.equal(response.status, 404);
      assert.equal(apiErrorSchema.parse(await response.json()).error.code, "NOT_FOUND");
    }
  }
});

test("business placeholders return 501 without login cookies, saved records, or private data", async (context) => {
  const operations = [
    ["POST", "/auth/register"], ["POST", "/auth/login"], ["POST", "/auth/logout"], ["GET", "/auth/me"],
    ["GET", "/users"], ["GET", "/users/me"], ["PATCH", "/users/me"], ["GET", "/users/example"], ["PATCH", "/users/example"], ["DELETE", "/users/example"],
    ["GET", "/products"], ["POST", "/products"], ["GET", "/products/example"], ["PATCH", "/products/example"], ["DELETE", "/products/example"],
    ["GET", "/categories"], ["POST", "/categories"], ["GET", "/categories/example"], ["PATCH", "/categories/example"], ["DELETE", "/categories/example"],
    ["POST", "/estimates/calculate"], ["GET", "/estimates"], ["POST", "/estimates"], ["GET", "/estimates/example"], ["DELETE", "/estimates/example"],
    ["GET", "/orders"], ["POST", "/orders"], ["GET", "/orders/example"], ["PATCH", "/orders/example/status"],
    ["GET", "/tickets"], ["POST", "/tickets"], ["GET", "/tickets/example"], ["PATCH", "/tickets/example/status"],
    ["GET", "/tickets/example/replies"], ["POST", "/tickets/example/replies"], ["GET", "/tickets/example/notes"], ["POST", "/tickets/example/notes"],
  ];
  for (const environment of ["development", "production"] as const) {
    const baseUrl = await start(context, environment);
    for (const [method, path] of operations) {
      const response = await fetch(`${baseUrl}${path}`, { method });
      assert.equal(response.status, 501, `${environment}: ${method} ${path}`);
      assert.equal(response.headers.get("set-cookie"), null);
      const body: unknown = await response.json();
      assert.deepEqual(Object.keys(body as object), ["error"]);
      assert.equal(apiErrorSchema.parse(body).error.code, "NOT_IMPLEMENTED");
    }
  }
});
