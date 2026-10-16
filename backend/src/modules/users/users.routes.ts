import { Router } from "express";
import { developmentOnly } from "../../middleware/development-only.js";
import { scaffoldStatus, businessOperation } from "./users.controller.js";

export function createUsersRouter(environment: string) {
  const router = Router();
  // Reserve this path before /:id so it returns 404 outside development.
  router.get("/scaffold-status", developmentOnly(environment), scaffoldStatus);
  router.get("/me", businessOperation);
  router.patch("/me", businessOperation);
  router.get("/", businessOperation);
  router.get("/:id", businessOperation);
  router.patch("/:id", businessOperation);
  router.delete("/:id", businessOperation);
  return router;
}
