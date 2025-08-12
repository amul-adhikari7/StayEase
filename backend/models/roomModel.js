const mongoose = require("mongoose");

class RoomModel {
  constructor() {
    this.schema = new mongoose.Schema({
      roomName: {
        type: String,
        required: true,
      },
      hotelName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },

      // ✅ GeoJSON format for geospatial queries
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
          required: true,
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
          validate: {
            validator: function (v) {
              return (
                Array.isArray(v) &&
                v.length === 2 &&
                v.every((n) => typeof n === "number")
              );
            },
            message: "Coordinates must be an array of two numbers [lng, lat]",
          },
        },
      },

      // Optional: store readable address for display
      address: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
        maxLength: 50000,
      },

      image: {
        type: String,
        required: true,
      },

      noOfBeds: {
        type: Number,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    // Add instance methods
    this.schema.methods.updatePrice = function (newPrice) {
      this.price = newPrice;
      return this.save();
    };

    this.schema.methods.updateLocation = function (coordinates, address) {
      this.location.coordinates = coordinates;
      this.address = address;
      return this.save();
    };

    // Add static methods
    this.schema.statics.findNearby = function (coordinates, maxDistance) {
      return this.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: coordinates,
            },
            $maxDistance: maxDistance,
          },
        },
      });
    };

    this.schema.statics.findByPriceRange = function (minPrice, maxPrice) {
      return this.find({ price: { $gte: minPrice, $lte: maxPrice } });
    };

    // Maintain existing index
    this.schema.index({ location: "2dsphere" });

    // Create and return model
    return mongoose.model("rooms", this.schema);
  }

  // Static factory method
  static async createRoom(roomData) {
    const Room = mongoose.model("rooms");
    const room = new Room(roomData);
    return await room.save();
  }

  // Static utility methods
  static async searchRooms(query) {
    const Room = mongoose.model("rooms");
    return Room.find({
      $or: [
        { roomName: new RegExp(query, "i") },
        { hotelName: new RegExp(query, "i") },
        { address: new RegExp(query, "i") },
      ],
    });
  }

  static async getByHotel(hotelName) {
    const Room = mongoose.model("rooms");
    return Room.find({ hotelName });
  }
}

const Room = new RoomModel();
module.exports = Room;
