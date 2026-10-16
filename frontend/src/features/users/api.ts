import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { apiRequest } from "../../lib/api-client";

export function getUsersScaffoldStatus(signal?: AbortSignal): Promise<ScaffoldStatus> {
  return apiRequest("/users/scaffold-status", scaffoldStatusSchema, { signal, cache: "no-store" });
}
