import express from "express";
import {
  getRooms,
  getApprovedRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatus,
} from "../controllers/roomController.js";

const router = express.Router();

// ================= USER =================
// 👉 Get only approved rooms (for users)
router.get("/approved", getApprovedRooms);

// ================= ADMIN =================
// 👉 Get all rooms (admin dashboard)
router.get("/all", getRooms);

// 👉 Approve / Reject room
router.put("/status/:id", updateRoomStatus);

// ================= OWNER =================
// 👉 Add new room
router.post("/add", addRoom);

// 👉 Update room
router.put("/update/:id", updateRoom);

// 👉 Delete room
router.delete("/delete/:id", deleteRoom);

export default router;
