import User from "../models/User.js";

// 🔹 GET all users (Admin) → ONLY NORMAL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password"); // ✅ FIXED

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 🔴 DELETE USER (NO CHANGE)
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
