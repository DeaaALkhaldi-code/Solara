"use client";

import { useEffect, useState } from "react";
import type { ScaffoldStatus } from "@solara/contracts";

export type ScaffoldPageProps = {
  title: string;
  purpose: string;
  todos: readonly string[];
  access?: "account" | "admin";
};

type Connection = { state: "loading" } | { state: "connected"; module: ScaffoldStatus["module"] } | { state: "error"; message: string };

export function ScaffoldPage({ title, purpose, todos, access, loadStatus }: ScaffoldPageProps & {
  loadStatus: (signal?: AbortSignal) => Promise<ScaffoldStatus>;
}) {
  const [connection, setConnection] = useState<Connection>({ state: "loading" });

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const controller = new AbortController();
    loadStatus(controller.signal).then((status) => {
      if (!controller.signal.aborted) setConnection({ state: "connected", module: status.module });
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) setConnection({ state: "error", message: error instanceof Error ? error.message : "Backend request failed." });
    });
    return () => controller.abort();
  }, [loadStatus]);

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p>{purpose}</p>
      <p>Placeholder only. Business functionality is not implemented.</p>
      {access && <p role="note">{access === "admin" ? "Admin" : "Account"} placeholder: authentication and authorization are still pending. No private data is loaded and no permissions are granted.</p>}
      <h2 className="text-lg font-semibold">Implementation TODOs</h2>
      <ul className="list-disc space-y-1 pl-6">{todos.map((todo) => <li key={todo}>{todo}</li>)}</ul>
      <div role="status" aria-live="polite">
        {process.env.NODE_ENV !== "development" ? <p>Scaffold connection checks are development-only.</p>
          : connection.state === "loading" ? <p>Loading backend scaffold…</p>
            : connection.state === "connected" ? <p>Connected to {connection.module} scaffold. Business implementation is still pending.</p>
              : <p>Connection error: {connection.message} Check the backend and NEXT_PUBLIC_API_URL.</p>}
      </div>
    </main>
  );
}
