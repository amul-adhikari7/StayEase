const HotelRoom = require("../models/hotelRoomModel");

// Suggest hotels based on location or other criteria
exports.suggestHotels = async (req, res) => {
  try {
    // Example: Suggest hotels near a given location (latitude, longitude)
    const { latitude, longitude, limit = 5 } = req.query;
    let query = {};
    if (latitude && longitude) {
      // Find hotels within ~5km radius (using simple bounding box for demo)
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      query = {
        latitude: { $gte: lat - 0.05, $lte: lat + 0.05 },
        longitude: { $gte: lng - 0.05, $lte: lng + 0.05 },
      };
    }
    const hotels = await HotelRoom.find(query).limit(Number(limit));
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// (Optional) Get all hotel rooms
exports.getAllHotelRooms = async (req, res) => {
  try {
    const rooms = await HotelRoom.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
