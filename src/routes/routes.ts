import { Router } from "express";
import companyRouter from "./company.routes";
import partyRouter from "./party.routes";
import menuRouter from "./menu.routes";

const router = Router();
router.use("/menus", menuRouter);
router.use("/companies", companyRouter);
router.use("/parties", partyRouter);

export default router;
