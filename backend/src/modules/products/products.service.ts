import { scaffoldStatusSchema, type ScaffoldStatus } from "@solara/contracts";
import { HttpError } from "../../lib/errors.js";

export function getScaffoldStatus(): ScaffoldStatus {
  return scaffoldStatusSchema.parse({ module: "products", status: "scaffold", implemented: false });
}

export function unimplementedOperation(): never {
  // TODO: Implement public catalog reads and authorized product/category writes, with validation and explicit response mapping.
  throw new HttpError(501, "NOT_IMPLEMENTED", "Catalog business operations are not implemented.");
}
