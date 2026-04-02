import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    // ✅ Role field (VERY IMPORTANT)
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "owner",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Owner", ownerSchema);
