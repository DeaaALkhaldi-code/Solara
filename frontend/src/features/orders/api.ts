import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { apiRequest } from "../../lib/api-client";

export function getOrdersScaffoldStatus(signal?: AbortSignal): Promise<ScaffoldStatus> {
  return apiRequest("/orders/scaffold-status", scaffoldStatusSchema, { signal, cache: "no-store" });
}
