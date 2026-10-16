import { apiErrorSchema, healthSchema } from "@solara/contracts";
import type { ZodType } from "zod";

export class ApiError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  schema: ZodType<T>,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is required.");
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("API paths must start with a single slash.");
  }
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, { ...options, headers });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(body);
    throw new ApiError(
      response.status,
      parsed.success ? parsed.data.error.code : "HTTP_ERROR",
      parsed.success ? parsed.data.error.message : `Request failed (${response.status}).`,
    );
  }
  return schema.parse(body);
}

export function getHealth(signal?: AbortSignal) {
  return apiRequest("/health", healthSchema, { signal, cache: "no-store" });
}
