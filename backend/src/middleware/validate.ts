import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { HttpError } from "../lib/errors.js";

export function validateBody(schema: ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) return next(new HttpError(400, "VALIDATION_ERROR", "Invalid request body."));
    request.body = result.data;
    next();
  };
}
