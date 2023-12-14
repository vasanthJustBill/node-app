import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Party from "../models/party.model";

// Fetch all parties
export const getAllParties = async (req: Request, res: Response) => {
  try {
    const parties = await Party.findAll();

    return res.status(200).json({ parties });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch parties" });
  }
};

// Create a party
export const createParty = async (req: Request, res: Response) => {
  try {
    const { name, gstType, gstin, contact, email, address, state } = req.body;

    // Validate required fields
    if (!name || !gstType || !gstin) {
      return res
        .status(400)
        .json({ error: "Name, GST Type, and GSTIN are required" });
    }

    // Create party
    const newParty = await Party.create({
      name,
      gstType,
      gstin,
      contact,
      email,
      address,
      state,
    });

    return res.status(201).json({ party: newParty });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessages });
    }

    return res.status(500).json({ error: "Failed to create party" });
  }
};

// Get an individual party by ID
export const getPartyById = async (req: Request, res: Response) => {
  try {
    const partyId = req.params.id;

    // Find party by ID
    const party = await Party.findByPk(partyId);

    if (!party) {
      return res.status(404).json({ error: "Party not found" });
    }

    return res.status(200).json({ party });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch party" });
  }
};

// Update a party
export const updateParty = async (req: Request, res: Response) => {
  try {
    const partyId = req.params.id;
    const { name, gstType, gstin, contact, email, address, state } = req.body;

    // Validate required fields
    if (!name || !gstType || !gstin) {
      return res
        .status(400)
        .json({ error: "Name, GST Type, and GSTIN are required" });
    }

    // Update party
    const updatedParty = await Party.update(
      {
        name,
        gstType,
        gstin,
        contact,
        email,
        address,
        state,
      },
      { where: { id: partyId } }
    );

    if (updatedParty[0] === 0) {
      return res.status(404).json({ error: "Party not found" });
    }

    return res.status(200).json({ message: "Party updated successfully" });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessages });
    }

    return res.status(500).json({ error: "Failed to update party" });
  }
};

// Delete a party
export const deleteParty = async (req: Request, res: Response) => {
  try {
    const partyId = req.params.id;

    // Delete party
    const deletedParty = await Party.destroy({ where: { id: partyId } });

    if (deletedParty === 0) {
      return res.status(404).json({ error: "Party not found" });
    }

    return res.status(200).json({ message: "Party deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete party" });
  }
};
