const path = require("path");
const fs = require("fs");
const roomModel = require("../models/roomModel");

// Create a new room
const createRoom = async (req, res) => {
  const {
    roomName,
    hotelName,
    price,
    latitude,
    longitude,
    address,
    description,
    noOfBeds,
  } = req.body;

  if (
    !roomName ||
    !hotelName ||
    !price ||
    !latitude ||
    !longitude ||
    !address ||
    !description ||
    !noOfBeds
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required fields",
    });
  }

  if (!req.files || !req.files.image) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }

  const { image } = req.files;
  const imageName = `${Date.now()}-${image.name}`;
  const imageUploadPath = path.join(__dirname, "../public/rooms", imageName);

  try {
    await image.mv(imageUploadPath);

    const newRoom = new roomModel({
      roomName,
      hotelName,
      price,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      address,
      description,
      noOfBeds,
      image: imageName,
    });

    const room = await newRoom.save();
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const allRooms = await roomModel.find({});
    res.status(200).json({
      success: true,
      message: "All rooms fetched successfully",
      data: allRooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single room
const getSingleRoom = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      data: room,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const room = await roomModel.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const imagePath = path.join(__dirname, "../public/rooms", room.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    let updatedData = { ...req.body };

    // Optional update for location
    if (req.body.latitude && req.body.longitude) {
      updatedData.location = {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      };
    }

    // Optional update for image
    if (req.files && req.files.image) {
      const { image } = req.files;
      const imageName = `${Date.now()}-${image.name}`;
      const imageUploadPath = path.join(
        __dirname,
        "../public/rooms",
        imageName
      );

      await image.mv(imageUploadPath);
      updatedData.image = imageName;

      const existingRoom = await roomModel.findById(req.params.id);
      if (existingRoom?.image) {
        const oldImagePath = path.join(
          __dirname,
          "../public/rooms",
          existingRoom.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Search rooms by hotel name
const searchRoomsByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Hotel name is required for search",
    });
  }

  try {
    const rooms = await roomModel.find({
      hotelName: { $regex: name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error searching for rooms",
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
  searchRoomsByName,
};
