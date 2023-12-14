import express from "express";
import {
  getAllParties,
  createParty,
  updateParty,
  deleteParty,
  getPartyById,
} from "../controllers/party.controller";

const partyRouter = express.Router();

// GET all parties
partyRouter.get("/", getAllParties);

// GET individual party by ID
partyRouter.get("/:id", getPartyById);

// POST create party
partyRouter.post("/", createParty);

// PUT update party
partyRouter.put("/:id", updateParty);

// DELETE delete party
partyRouter.delete("/:id", deleteParty);

export default partyRouter;
