import { Router } from "express";
import { developmentOnly } from "../../middleware/development-only.js";
import { scaffoldStatus, businessOperation } from "./auth.controller.js";

export function createAuthRouter(environment: string) {
  const router = Router();
  // Reserve this path before /:id so it returns 404 outside development.
  router.get("/scaffold-status", developmentOnly(environment), scaffoldStatus);
  router.post("/register", businessOperation);
  router.post("/login", businessOperation);
  router.post("/logout", businessOperation);
  router.get("/me", businessOperation);
  return router;
}
