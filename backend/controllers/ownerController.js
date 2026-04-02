import Owner from "../models/owner.js"; // ✅ correct model
import Hostel from "../models/Hostel.js";
import Feedback from "../models/Feedback.js";

// 🔹 GET ALL OWNERS
export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find().select("-password"); // ✅ FIXED

    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 🔴 DELETE OWNER + HOSTELS + FEEDBACK
export const deleteOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;

    // 🔹 1. Get all hostels of this owner
    const hostels = await Hostel.find({ ownerId });

    // 🔹 2. Extract hostel names
    const hostelNames = hostels.map((h) => h.name); // ✅ FIXED

    // 🔴 3. Delete feedback
    await Feedback.deleteMany({
      hallName: { $in: hostelNames },
    });

    // 🔴 4. Delete hostels
    await Hostel.deleteMany({ ownerId });

    // 🔴 5. Delete owner
    const deletedOwner = await Owner.findByIdAndDelete(ownerId); // ✅ FIXED

    if (!deletedOwner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    res.status(200).json({
      message: "Owner, hostels, and feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
