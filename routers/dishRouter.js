import { Router } from "express";
import dishController from "../controllers/dishController.js";
import Validations from "../validations/validations.js";
import errorValid from "../middleware/ErrorValidationsMeddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import checkrole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, Validations.dishValidation, errorValid, dishController.create);
router.get("/", dishController.getAll);

export default router;
