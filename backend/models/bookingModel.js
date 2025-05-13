const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
