import { Router } from "express";

import adminRouter from "./adminRouter.js";
import dishRouter from "./dishRouter.js";
import catagoryRouter from "./categoryRouter.js";
import supplementsRouter from "./supplementsRouter.js";

const router = new Router();

router.use("/admin", adminRouter);
router.use("/dish", dishRouter);
router.use("/category", catagoryRouter);
router.use("/supplements", supplementsRouter);

export default router;
