import express from "express";
import cors from "cors";
import { healthSchema } from "@solara/contracts";
import { HttpError } from "./lib/errors.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createApp(frontendOrigin: string) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: frontendOrigin }));
  app.use(express.json({ limit: "100kb" }));
  app.get("/api/health", (_request, response) => {
    response.json(healthSchema.parse({ status: "ok" }));
  });
  app.use((_request, _response, next) => next(new HttpError(404, "NOT_FOUND", "Endpoint not found.")));
  app.use(errorHandler);
  return app;
}
