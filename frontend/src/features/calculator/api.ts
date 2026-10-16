import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { apiRequest } from "../../lib/api-client";

export function getCalculatorScaffoldStatus(signal?: AbortSignal): Promise<ScaffoldStatus> {
  return apiRequest("/estimates/scaffold-status", scaffoldStatusSchema, { signal, cache: "no-store" });
}
