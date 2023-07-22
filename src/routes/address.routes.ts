import express from "express";
import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";

const router = express.Router();

// Route to create a new address
router.post("/", createAddress);

// Route to get all addresses for a specific profile
router.get("/", getAllAddresses);

// Route to get an address by ID for a specific profile
router.get("/:id", getAddressById);

// Route to update an address by ID for a specific profile
router.put("/:id", updateAddress);

// Route to delete an address by ID for a specific profile
router.delete("/:id", deleteAddress);

export default router;
