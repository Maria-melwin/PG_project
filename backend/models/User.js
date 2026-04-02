import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      default: "user",
    },

    // ✅ Optional
    city: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
