import { Router } from "express";
import companyRouter from "./company.routes";
import profiles from "./profile.routes";

const router = Router();
router.use("/company", companyRouter);
router.use("/profiles", profiles);

export default router;
