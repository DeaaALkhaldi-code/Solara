import { Router } from "express";
import { developmentOnly } from "../../middleware/development-only.js";
import { scaffoldStatus, businessOperation } from "./products.controller.js";

export function createProductsRouter(environment: string) {
  const router = Router();
  // Reserve this path before /:id so it returns 404 outside development.
  router.get("/scaffold-status", developmentOnly(environment), scaffoldStatus);
  router.get("/", businessOperation);
  router.post("/", businessOperation);
  router.get("/:id", businessOperation);
  router.patch("/:id", businessOperation);
  router.delete("/:id", businessOperation);
  return router;
}

export function createCategoriesRouter() {
  const router = Router();
  router.get("/", businessOperation);
  router.post("/", businessOperation);
  router.get("/:id", businessOperation);
  router.patch("/:id", businessOperation);
  router.delete("/:id", businessOperation);
  return router;
}
