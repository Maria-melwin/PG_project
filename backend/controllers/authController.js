import User from "../models/User.js";
import Owner from "../models/owner.js"; // ✅ NEW
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, mobile, role } = req.body;

    // 🔹 CHECK BOTH COLLECTIONS
    const existingUser = await User.findOne({ email });
    const existingOwner = await Owner.findOne({ email });

    if (existingUser || existingOwner) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ================= OWNER REGISTER =================
    if (role === "owner") {
      const owner = await Owner.create({
        username,
        email,
        password: hashedPassword,
        mobile,
        role: "owner",
      });

      return res.status(201).json({
        message: "Owner registered successfully",
        user: {
          id: owner._id,
          email: owner.email,
          role: owner.role,
        },
      });
    }

    // ================= NORMAL USER REGISTER =================
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ================= ADMIN LOGIN =================
    if (email === "admin@gmail.com" && password === "Admin@123") {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
        user: {
          id: "admin",
          email: "admin@123",
        },
      });
    }

    // ================= CHECK OWNER FIRST =================
    let user = await Owner.findOne({ email });

    // ================= IF NOT OWNER → CHECK USER =================
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ================= TOKEN =================
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
