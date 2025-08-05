const express = require("express");
const router = express.Router();
const hotelRoomController = require("../controller/hotelRoomController");

// Suggest hotels (optionally by location)
router.get("/suggest", hotelRoomController.suggestHotels);

// Get all hotel rooms
router.get("/all", hotelRoomController.getAllHotelRooms);

module.exports = router;
