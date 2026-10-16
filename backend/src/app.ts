import express from "express";
import cors from "cors";
import { healthSchema } from "@solara/contracts";
import { HttpError } from "./lib/errors.js";
import { errorHandler } from "./middleware/error-handler.js";
import { createAuthRouter } from "./modules/auth/auth.routes.js";
import { createUsersRouter } from "./modules/users/users.routes.js";
import { createProductsRouter, createCategoriesRouter } from "./modules/products/products.routes.js";
import { createEstimatesRouter } from "./modules/estimates/estimates.routes.js";
import { createOrdersRouter } from "./modules/orders/orders.routes.js";
import { createTicketsRouter } from "./modules/tickets/tickets.routes.js";

export function createApp(frontendOrigin: string, environment: "development" | "test" | "production" = "production") {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: frontendOrigin }));
  app.use(express.json({ limit: "100kb" }));
  app.get("/api/health", (_request, response) => {
    response.json(healthSchema.parse({ status: "ok" }));
  });
  app.use("/api/auth", createAuthRouter(environment));
  app.use("/api/users", createUsersRouter(environment));
  app.use("/api/products", createProductsRouter(environment));
  app.use("/api/categories", createCategoriesRouter());
  app.use("/api/estimates", createEstimatesRouter(environment));
  app.use("/api/orders", createOrdersRouter(environment));
  app.use("/api/tickets", createTicketsRouter(environment));
  app.use((_request, _response, next) => next(new HttpError(404, "NOT_FOUND", "Endpoint not found.")));
  app.use(errorHandler);
  return app;
}
