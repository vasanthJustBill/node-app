import { Router } from "express";
import {
  fetchFirstCompany,
  createOrUpdateCompany,
} from "../controllers/company.controller";
const companyRouter = Router();

companyRouter.get("/", fetchFirstCompany);
companyRouter.post("/", createOrUpdateCompany);

export default companyRouter;
