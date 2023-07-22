import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";

const router = express.Router();

// Route to create a new contact for a specific profile
router.post("/", createContact);

// Route to get all contacts for a specific profile
router.get("/", getAllContacts);

// Route to get a contact by ID for a specific profile
router.get("/:id", getContactById);

// Route to update a contact by ID for a specific profile
router.put("/:id", updateContact);

// Route to delete a contact by ID for a specific profile
router.delete("/:id", deleteContact);

export default router;
