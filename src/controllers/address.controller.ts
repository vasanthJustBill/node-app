import { Request, Response } from "express";
import Address from "../models/address.model";
import { ValidationError } from "sequelize";

// Create a new address
export const createAddress = async (req: Request, res: Response) => {
  try {
    const { title, address, profile_id } = req.body;
    const newAddress = await Address.create({ title, address, profile_id });

    return res.status(201).json({ address: newAddress });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to create address" });
  }
};

// Get all addresses
export const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const addresses = await Address.findAll();

    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch addresses" });
  }
};

// Get a single address by ID
export const getAddressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.json({ address });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch address" });
  }
};

// Update an address by ID
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, address, profile_id } = req.body;
    const addressToUpdate = await Address.findByPk(id);

    if (!addressToUpdate) {
      return res.status(404).json({ error: "Address not found" });
    }

    await addressToUpdate.update({ title, address, profile_id });

    return res.json({ address: addressToUpdate });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to update address" });
  }
};

// Delete an address by ID
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const addressToDelete = await Address.findByPk(id);

    if (!addressToDelete) {
      return res.status(404).json({ error: "Address not found" });
    }

    await addressToDelete.destroy();

    return res.json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete address" });
  }
};
