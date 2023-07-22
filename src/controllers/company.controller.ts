import { Request, Response } from "express";
import Company from "../models/company.model";
import Contact from "../models/contact.model";
import Address from "../models/address.model";
import Profile from "../models/profile.model";
import sequelize from "../models/sequelize"; // Make sure to import the 'sequelize' instance with transactions

const fetchFirstCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findOne({
      include: [
        {
          model: Contact,
          as: "contacts",
          attributes: ["id", "title", "contact"],
        },
        {
          model: Address,
          as: "addresses",
          attributes: ["id", "title", "address"],
        },
      ],
    });

    if (company) {
      return res.json({
        success: true,
        data: company,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No companies found" });
    }
  } catch (error) {
    console.error("Error fetching first company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

async function createOrUpdateCompany(req, res) {
  const { title, description, contacts, addresses } = req.body;

  let transaction;

  try {
    transaction = await sequelize.transaction();

    let company;

    const profile = await Profile.findOne({ where: { title }, transaction });

    if (profile) {
      // Update existing contacts and addresses
      await Promise.all(
        contacts.map((contact) =>
          Contact.upsert(
            { ...contact, profile_id: profile.id },
            { transaction }
          )
        )
      );

      await Promise.all(
        addresses.map((address) =>
          Address.upsert(
            { ...address, profile_id: profile.id },
            { transaction }
          )
        )
      );

      // Update the existing company
      company = await Company.update(
        { title, description, profile_id: profile.id },
        { where: { profile_id: profile.id }, transaction }
      );
    } else {
      // Create a new profile with the company title
      const newProfile = await Profile.create({ title }, { transaction });

      // Create new contacts and addresses with the profile id
      await Promise.all(
        contacts.map((contact) =>
          Contact.create(
            { ...contact, profile_id: newProfile.id },
            { transaction }
          )
        )
      );

      await Promise.all(
        addresses.map((address) =>
          Address.create(
            { ...address, profile_id: newProfile.id },
            { transaction }
          )
        )
      );

      // Create the new company with the profile id
      company = await Company.create(
        { title, description, profile_id: newProfile.id },
        { transaction }
      );
    }

    // If everything is successful, commit the transaction
    await transaction.commit();

    res
      .status(200)
      .json({
        success: true,
        message: "Company record created or updated successfully.",
        data: company,
      });
  } catch (error) {
    // If any issues occur during the process, rollback the transaction
    if (transaction) {
      await transaction.rollback();
    }

    console.error("Error creating or updating company:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
}

export { fetchFirstCompany, createOrUpdateCompany };
