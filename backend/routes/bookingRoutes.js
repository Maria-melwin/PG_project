import express from "express";
import { addBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/add", addBooking);
router.get("/all", getBookings);

export default router;
