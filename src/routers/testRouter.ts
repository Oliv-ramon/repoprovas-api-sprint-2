import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.get(
  "/tests",
  ensureAuthenticatedMiddleware,
  testController.find
);

/* testRouter.post(
  "/tests",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(testSchema),
  testController.updateViews
); */

testRouter.patch(
  "/tests/:testId/views",
  ensureAuthenticatedMiddleware,
  testController.updateViews
);

export default testRouter;
