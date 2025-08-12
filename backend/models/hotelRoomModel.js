const mongoose = require("mongoose");

class HotelRoomModel {
  constructor() {
    this.schema = new mongoose.Schema(
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

    // Add schema methods
    this.schema.methods.updatePrice = function (newPrice) {
      this.price = newPrice;
      return this.save();
    };

    // Add static methods
    this.schema.statics.findByLocation = function (location) {
      return this.find({ location: new RegExp(location, "i") });
    };

    this.schema.statics.findByPriceRange = function (minPrice, maxPrice) {
      return this.find({ price: { $gte: minPrice, $lte: maxPrice } });
    };

    // Create and return the model
    return mongoose.model("HotelRoom", this.schema);
  }

  // Static factory method
  static async createHotelRoom(roomData) {
    const HotelRoom = mongoose.model("HotelRoom");
    const room = new HotelRoom(roomData);
    return await room.save();
  }

  // Static utility methods
  static async findNearby(latitude, longitude, maxDistance) {
    const HotelRoom = mongoose.model("HotelRoom");
    return HotelRoom.find({
      latitude: { $exists: true },
      longitude: { $exists: true },
    })
      .where("latitude")
      .gte(latitude - maxDistance)
      .lte(latitude + maxDistance)
      .where("longitude")
      .gte(longitude - maxDistance)
      .lte(longitude + maxDistance);
  }
}

const HotelRoom = new HotelRoomModel();
module.exports = HotelRoom;
