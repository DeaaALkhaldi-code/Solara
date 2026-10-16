import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { apiRequest } from "../../lib/api-client";

export function getAuthScaffoldStatus(signal?: AbortSignal): Promise<ScaffoldStatus> {
  return apiRequest("/auth/scaffold-status", scaffoldStatusSchema, { signal, cache: "no-store" });
}
