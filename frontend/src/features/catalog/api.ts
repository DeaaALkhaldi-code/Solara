import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { apiRequest } from "../../lib/api-client";

export function getCatalogScaffoldStatus(signal?: AbortSignal): Promise<ScaffoldStatus> {
  return apiRequest("/products/scaffold-status", scaffoldStatusSchema, { signal, cache: "no-store" });
}
