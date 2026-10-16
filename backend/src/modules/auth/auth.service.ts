import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "auth", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement registration, session creation/verification, logout, password hashing, and secure cookies. Never trust client roles.
  throw new HttpError(501, "NOT_IMPLEMENTED", "Authentication business operations are not implemented.");
}
