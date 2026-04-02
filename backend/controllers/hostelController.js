import Hostel from "../models/Hostel.js";

// GET ALL HOSTELS
export const getHostelByOwner = async (req, res) => {
  try {
    const hostel = await Hostel.findOne({
      ownerId: req.params.ownerId,
    });

    console.log("DB Result:", hostel);

    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE HOSTEL
export const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.json({ message: "Hostel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
