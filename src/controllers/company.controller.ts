import { Request, Response } from "express";
import Company from "../models/company.model";
import { ValidationError } from 'sequelize';

const fetchFirstCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOne();
    if (company) {
      return res.json(company);
    } else {
      return res.status(404).json({ message: "No companies found" });
    }
  } catch (error) {
    console.error("Error fetching first company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createOrUpdateCompany = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Check if a company already exists
    const existingCompany = await Company.findOne();

    if (existingCompany) {
      // Update the existing company
      existingCompany.name = name;
      existingCompany.description = description;
      await existingCompany.save();
      return res.json(existingCompany);
    } else {
      // Create a new company
      const newCompany = await Company.create({ name, description });
      return res.json(newCompany);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      // Handle validation errors
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    console.error("Error creating/updating company:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { fetchFirstCompany, createOrUpdateCompany };
