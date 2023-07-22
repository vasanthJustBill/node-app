import { Request, Response, NextFunction } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize";
import Profile from "../models/profile.model";
import Contact from "../models/contact.model";
import Address from "../models/address.model";

// Middleware to validate profile before any contact action
export const validateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, profile_id } = req.params;
    const profile = await Profile.findByPk(id || profile_id);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Add the profile to the request object for use in other controller functions
    req.profile = profile;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Failed to validate profile" });
  }
};

// Create a new profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const profile = await Profile.create({ title });

    return res.status(201).json({ profile });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to create profile" });
  }
};

// Get all profiles
export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.findAll();

    return res.json({ profiles });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

// Get a single profile by ID
export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the profile by ID and include associated contacts and addresses
    const profile = await Profile.findByPk(id, {
      include: [
        {
          model: Contact,
          as: "contacts",
          attributes: { exclude: ["profile_id", "createdAt", "updatedAt"] },
        },
        {
          model: Address,
          as: "addresses",
          attributes: { exclude: ["profile_id", "createdAt", "updatedAt"] },
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json({ profile });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update a profile by ID
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profile.update({ title });

    return res.json({ profile });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to update profile" });
  }
};

// Delete a profile by ID
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profile.destroy();

    return res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      // Custom message for foreign key constraint violation (profile_id in another table)
      return res
        .status(400)
        .json({ error: "Cannot delete profile due to related records" });
    }

    return res.status(500).json({ error: "Failed to delete profile" });
  }
};
