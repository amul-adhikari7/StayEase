const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
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

// ✅ Add 2dsphere index for location field
roomSchema.index({ location: "2dsphere" });

const Room = mongoose.model("rooms", roomSchema);
module.exports = Room;
