import PG from "../models/PG.js";

// ================= ADD PG =================
export const addPG = async (req, res) => {
  try {
    const { name, mobile, address, city, facilities, price, ownerId } =
      req.body; // ✅ ADDED ownerId

    const newPG = new PG({
      name,
      mobile,
      address,
      city,
      facilities,
      price,
      ownerId, // ✅ ADDED

      image: req.file ? `uploads/${req.file.filename}` : "",
      status: "Pending",
    });

    await newPG.save();

    res.status(201).json({
      message: "PG added successfully (Waiting for admin approval)",
      data: newPG,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL PG =================
export const getPGs = async (req, res) => {
  try {
    const pgs = await PG.find().sort({ createdAt: -1 });
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET APPROVED =================
export const getApprovedPGs = async (req, res) => {
  try {
    const pgs = await PG.find({ status: "Approved" });
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET OWNER PG (NEW) =================
export const getOwnerPG = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const pg = await PG.findOne({ ownerId });

    res.json(pg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE STATUS =================
export const updatePGStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await PG.findByIdAndUpdate(id, { status }, { new: true });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
export const deletePG = async (req, res) => {
  try {
    await PG.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
