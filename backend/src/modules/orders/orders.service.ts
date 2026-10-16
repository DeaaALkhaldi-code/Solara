import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "orders", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement authenticated ordering with database prices, transactions, line-item snapshots, stock checks, and authorized status transitions.
  throw new HttpError(501, "NOT_IMPLEMENTED", "Ordering business operations are not implemented.");
}
