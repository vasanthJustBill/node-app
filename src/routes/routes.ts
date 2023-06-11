import { Router } from "express";
import companyRouter from "./company.routes";

const router = Router();
router.use("/company", companyRouter);

export default router;
