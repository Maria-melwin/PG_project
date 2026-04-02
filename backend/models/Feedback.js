import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    hallName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Feedback", feedbackSchema);
