import express from "express";
import multer from "multer";

import {
  addPG,
  getPGs,
  getApprovedPGs,
  deletePG,
  updatePGStatus,
  getOwnerPG, // ✅ ADDED
} from "../controllers/pgController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), addPG);
router.get("/all", getPGs);
router.get("/approved", getApprovedPGs);

// ✅ NEW
router.get("/owner/:ownerId", getOwnerPG);

router.put("/status/:id", updatePGStatus);
router.delete("/:id", deletePG);

export default router;
