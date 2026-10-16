import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "tickets", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement owner-scoped tickets/replies and admin-only status changes/internal notes. Never expose staff notes in customer responses.
  throw new HttpError(501, "NOT_IMPLEMENTED", "Support business operations are not implemented.");
}
