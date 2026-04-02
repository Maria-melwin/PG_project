import express from "express";
import {
  addFeedback,
  getFeedbacks,
  deleteFeedback, // ✅ IMPORT
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", addFeedback);
router.get("/", getFeedbacks);

// 🔴 ADD THIS LINE
router.delete("/:id", deleteFeedback);

export default router;
