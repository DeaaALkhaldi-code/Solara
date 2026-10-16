import type { RequestHandler } from "express";
import * as service from "./users.service.js";

export const scaffoldStatus: RequestHandler = (_request, response) => {
  response.json(service.getScaffoldStatus());
};

export const businessOperation: RequestHandler = () => {
  // TODO: Add operation-specific input validation and controllers when implementing the feature.
  // Express 5 forwards this service's explicit 501 error to the existing error handler.
  service.unimplementedOperation();
};
