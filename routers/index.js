import { Router } from "express";

import adminRouter from "./adminRouter.js";

const router = new Router();

router.use("/admin", adminRouter);

export default router;
