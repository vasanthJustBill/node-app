import express from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  validateProfile,
} from "../controllers/profile.controller";
import contact from "./contact.routes";
import address from "./address.routes";

const router = express.Router();

// Route to get all profiles and create a new profile
router.get("/", getAllProfiles);
router.post("/", createProfile);

// Middleware to validate profile by ID before any profile-related action
router.use("/:id", validateProfile);

// Routes to get a profile by ID, update a profile, and delete a profile
router.get("/:id", getProfileById);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

// Nested routes for handling contacts & addresses under a specific profile
router.use("/:profile_id/contacts", contact);
router.use("/:profile_id/addresses", address);

export default router;
