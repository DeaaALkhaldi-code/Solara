import type { RequestHandler } from "express";
import { HttpError } from "../lib/errors.js";

export function developmentOnly(environment: string): RequestHandler {
  return (_request, _response, next) => {
    if (environment !== "development") return next(new HttpError(404, "NOT_FOUND", "Endpoint not found."));
    next();
  };
}
