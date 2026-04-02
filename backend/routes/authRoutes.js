import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// ================= AUTH ROUTES =================

// 🔹 Register (User / Owner)
router.post("/register", registerUser);

// 🔹 Login (User / Owner / Admin)
router.post("/login", loginUser);

export default router;
