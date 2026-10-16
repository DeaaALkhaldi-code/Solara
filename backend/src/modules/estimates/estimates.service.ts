import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "estimates", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement validated, versioned calculations and owner-scoped saved estimates; confirm units and engineering assumptions.
  throw new HttpError(501, "NOT_IMPLEMENTED", "Calculator and estimates business operations are not implemented.");
}
