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
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2 && v.every((num) => typeof num === "number");
        },
        message: "Coordinates must be an array of [longitude, latitude]",
      },
    },
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

roomSchema.index({ location: "2dsphere" });

const Room = mongoose.model("rooms", roomSchema); // to export into controller
module.exports = Room;
