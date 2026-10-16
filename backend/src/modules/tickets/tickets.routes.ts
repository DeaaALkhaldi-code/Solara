import { Router } from "express";
import { developmentOnly } from "../../middleware/development-only.js";
import { scaffoldStatus, businessOperation } from "./tickets.controller.js";

export function createTicketsRouter(environment: string) {
  const router = Router();
  // Reserve this path before /:id so it returns 404 outside development.
  router.get("/scaffold-status", developmentOnly(environment), scaffoldStatus);
  router.get("/", businessOperation);
  router.post("/", businessOperation);
  router.get("/:id", businessOperation);
  router.patch("/:id/status", businessOperation);
  router.get("/:id/replies", businessOperation);
  router.post("/:id/replies", businessOperation);
  router.get("/:id/notes", businessOperation);
  router.post("/:id/notes", businessOperation);
  return router;
}
