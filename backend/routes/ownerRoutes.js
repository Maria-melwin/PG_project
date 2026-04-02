import express from "express";
import { getOwners, deleteOwner } from "../controllers/ownerController.js";

const router = express.Router();

// 👉 get all hostel owners (NO CHANGE)
router.get("/", getOwners);

// 🔴 DELETE owner + their hostels (NEW)
router.delete("/:id", deleteOwner);

export default router;
