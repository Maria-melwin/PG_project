import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    persons: { type: Number, required: true },
    amount: { type: Number, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },

   

    // ✅ ADD THESE FIELDS (IMPORTANT)
    userEmail: { type: String, required: true }, // for filtering user bookings
    hostelName: String,
    hostelEmail: String,
    roomType: String,
    roomPrice: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
