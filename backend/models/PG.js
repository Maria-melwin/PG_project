import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    facilities: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },

    // ✅ ADD THIS (VERY IMPORTANT)
    ownerId: {
      type: String,
      required: true,
    },

    // ✅ ALREADY GOOD
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("PG", pgSchema);
