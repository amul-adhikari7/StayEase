const mongoose = require("mongoose");

const hotelRoomSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    noOfBeds: { type: Number, required: true },
    image: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    description: { type: String },
    amenities: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "hotel_rooms" }
);

module.exports = mongoose.model("HotelRoom", hotelRoomSchema);
