import Room from "../models/Room.js";

// ================= GET ALL ROOMS (ADMIN) =================
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ONLY APPROVED ROOMS (USER) =================
export const getApprovedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ status: "Approved" });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADD ROOM (OWNER) =================
export const addRoom = async (req, res) => {
  try {
    const { hostelName, roomType, price, vacancy, image } = req.body;

    const newRoom = new Room({
      hostelName,
      roomType,
      price,
      vacancy,
      image,
      status: "Pending", // ✅ auto pending
    });

    await newRoom.save();

    res.status(201).json({
      message: "Room added successfully. Waiting for admin approval.",
      room: newRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE ROOM (OWNER) =================
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE ROOM =================
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADMIN: UPDATE STATUS =================
export const updateRoomStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      message: "Room status updated",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
