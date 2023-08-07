import { Router } from "express";
import supplementsController from "../controllers/supplementsController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
// import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  // checkRole(["ADMIN"]),
  Validation.supplementsValidation,
  errorValidations,
  supplementsController.create
);
router.get("/", supplementsController.getAll);

export default router;
