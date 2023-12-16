import express from "express";
import { getMenus, seedMenu } from "../controllers/menu.controller";

const menuRouter = express.Router();
menuRouter.get("/", getMenus);
menuRouter.post("/seed", seedMenu);

export default menuRouter;
