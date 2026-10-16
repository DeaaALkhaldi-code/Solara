import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "users", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement profile/admin operations after authentication, role checks, owner scoping, and explicit public DTO mapping.
  throw new HttpError(501, "NOT_IMPLEMENTED", "User management business operations are not implemented.");
}
