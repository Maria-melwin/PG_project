import express from "express";
import multer from "multer";
import {
  addHostel,
  getHostels,
  getHostelByOwner,
  deleteHostel,
} from "../controllers/hostelController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ ROUTES
router.post("/add-hostel", upload.single("image"), addHostel);
router.get("/hostels", getHostels);
router.get("/owner/:ownerId", getHostelByOwner);
router.delete("/:id", deleteHostel);

export default router;
