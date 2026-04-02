import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// 👉 Get all users
router.get("/", getUsers);

// 🔴 DELETE user
router.delete("/:id", deleteUser);

export default router;
