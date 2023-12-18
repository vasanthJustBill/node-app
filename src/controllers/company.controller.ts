import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Company from "../models/company.model";

export const getFirstCompany = async (req: Request, res: Response) => {
  try {
    const firstCompany = await Company.findOne({});

    if (!firstCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.status(200).json({ company: firstCompany });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch the first company" });
  }
};

export const createOrUpdateFirstCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id,
      name,
      description,
      shippingAddress,
      billingAddress,
      primaryContact,
      alternateContact,
      primaryEmail,
      alternateEmail,
      businessType,
      website,
      gstType,
      gstin,
      sameAsShipping,
    } = req.body;

    // Check if any company exists
    const existingCompany = await Company.findOne();

    // If a company exists, update it; otherwise, create a new one
    if (existingCompany) {
      await Company.update(
        {
          name,
          description,
          shippingAddress,
          billingAddress,
          primaryContact,
          alternateContact,
          primaryEmail,
          alternateEmail,
          businessType,
          website,
          gstType,
          gstin,
          sameAsShipping,
        },
        { where: { id } }
      );

      return res.status(200).json({ message: "Company updated successfully" });
    } else {
      // Validate required fields
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      // Create a new company
      const newCompany = await Company.create({
        name,
        description,
        shippingAddress,
        billingAddress,
        primaryContact,
        alternateContact,
        primaryEmail,
        alternateEmail,
        businessType,
        website,
        gstType,
        gstin,
        sameAsShipping,
      });

      return res.status(201).json({ company: newCompany });
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessages });
    }

    return res
      .status(500)
      .json({ error: "Failed to create or update the first company" });
  }
};
