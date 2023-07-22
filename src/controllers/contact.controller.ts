import { Request, Response } from "express";
import Contact from "../models/contact.model";
import { ValidationError } from "sequelize";

// Create a new contact for a specific profile
export const createContact = async (req: Request, res: Response) => {
  try {
    const { title, contact } = req.body;
    const { profile } = req; // Access the validated profile from the request object
    const newContact = await Contact.create({
      title,
      contact,
      profile_id: profile.id,
    });

    return res.status(201).json({ contact: newContact });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to create contact" });
  }
};

// Get all contacts for a specific profile
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { profile } = req; // Access the validated profile from the request object
    const contacts = await Contact.findAll({
      where: { profile_id: profile.id },
    });

    return res.json({ contacts });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// Get a single contact by ID for a specific profile
export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { profile } = req; // Access the validated profile from the request object
    const contact = await Contact.findOne({
      where: { id, profile_id: profile.id },
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.json({ contact });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch contact" });
  }
};

// Update a contact by ID for a specific profile
export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, contact } = req.body;
    const { profile } = req; // Access the validated profile from the request object
    const contactToUpdate = await Contact.findOne({
      where: { id, profile_id: profile.id },
    });

    if (!contactToUpdate) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await contactToUpdate.update({ title, contact });

    return res.json({ contact: contactToUpdate });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Failed to update contact" });
  }
};

// Delete a contact by ID for a specific profile
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { profile } = req; // Access the validated profile from the request object
    const contactToDelete = await Contact.findOne({
      where: { id, profile_id: profile.id },
    });

    if (!contactToDelete) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await contactToDelete.destroy();

    return res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete contact" });
  }
};
