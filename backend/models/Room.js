import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    // 🔹 Hostel / PG Name
    hostelName: {
      type: String,
      required: true,
    },

    // 🔹 Room Type
    roomType: {
      type: String,
      required: true,
    },

    // 🔹 Price
    price: {
      type: Number,
      required: true,
    },

    // 🔹 Vacancy
    vacancy: {
      type: Number,
      required: true,
    },

    // 🔹 Image (optional)
    image: {
      type: String,
      default: "",
    },

    // 🔹 Admin Approval Status ✅ IMPORTANT
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Room", roomSchema);
