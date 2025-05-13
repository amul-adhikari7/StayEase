const mongoose = require('mongoose');

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

const Room = mongoose.model("rooms", roomSchema); // to export into controller
module.exports = Room;
