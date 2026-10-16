import { Router } from "express";
import { developmentOnly } from "../../middleware/development-only.js";
import { scaffoldStatus, businessOperation } from "./estimates.controller.js";

export function createEstimatesRouter(environment: string) {
  const router = Router();
  // Reserve this path before /:id so it returns 404 outside development.
  router.get("/scaffold-status", developmentOnly(environment), scaffoldStatus);
  router.post("/calculate", businessOperation);
  router.get("/", businessOperation);
  router.post("/", businessOperation);
  router.get("/:id", businessOperation);
  router.delete("/:id", businessOperation);
  return router;
}
