import Booking from "../models/Booking.js";

// ➤ Add Booking
export const addBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get all bookings (UPDATED)
export const getBookings = async (req, res) => {
  try {
    const { email } = req.query; // ✅ NEW

    let bookings;

    if (email) {
      // ✅ FILTER USER BOOKINGS
      bookings = await Booking.find({ userEmail: email }).sort({
        createdAt: -1,
      });
    } else {
      // ✅ OLD FUNCTION (UNCHANGED)
      bookings = await Booking.find().sort({ createdAt: -1 });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
