import express from "express";
import {
  getFirstCompany,
  createOrUpdateFirstCompany
} from "../controllers/company.controller";

const companyRouter = express.Router();

companyRouter.get("/", getFirstCompany);
companyRouter.post("/", createOrUpdateFirstCompany);

export default companyRouter;
