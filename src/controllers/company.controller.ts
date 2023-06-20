import { Request, Response } from "express";
import Company from "../models/company.model";
import { ValidationError } from "sequelize";

const fetchFirstCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOne();
    if (company) {
      return res.json({ success: true, data: company });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No companies found" });
    }
  } catch (error) {
    console.error("Error fetching first company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

const createOrUpdateCompany = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const existingCompany = await Company.findOne();

    if (existingCompany) {
      existingCompany.name = name;
      existingCompany.description = description;
      await existingCompany.save();
      return res.json({ success: true, data: existingCompany });
    } else {
      const newCompany = await Company.create({ name, description });
      return res.json({ success: true, data: newCompany });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    console.error("Error creating/updating company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { fetchFirstCompany, createOrUpdateCompany };
