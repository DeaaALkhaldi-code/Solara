import type { ErrorRequestHandler } from "express";
import { apiErrorSchema } from "@solara/contracts";
import { HttpError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  if (response.headersSent) return next(error);
  let status = 500;
  let code = "INTERNAL_ERROR";
  let message = "An unexpected error occurred.";
  if (error instanceof HttpError) {
    ({ status, code, message } = error);
  } else if (typeof error === "object" && error !== null && "type" in error) {
    if (error.type === "entity.parse.failed") {
      status = 400; code = "INVALID_JSON"; message = "Request body must contain valid JSON.";
    } else if (error.type === "entity.too.large") {
      status = 413; code = "PAYLOAD_TOO_LARGE"; message = "Request body exceeds the size limit.";
    } else if (error.type === "charset.unsupported" || error.type === "encoding.unsupported") {
      status = 415; code = "UNSUPPORTED_ENCODING"; message = "Unsupported request encoding.";
    }
  }
  if (status === 500) logger.error("An unhandled request error occurred.");
  response.status(status).json(apiErrorSchema.parse({ error: { code, message } }));
};
