import Feedback from "../models/Feedback.js";

// ➤ Add feedback
export const addFeedback = async (req, res) => {
  try {
    const { hallName, userName, feedback, ownerId } = req.body;

    const newFeedback = new Feedback({
      hallName,
      userName,
      feedback,
      ownerId,
      date: new Date().toLocaleString(),
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback added successfully",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get all feedback
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 ADD THIS (DELETE FUNCTION)
export const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Feedback.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
