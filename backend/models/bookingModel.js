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
  checkOutDate: {
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
// Index for preventing duplicate bookings and optimizing date range queries
bookingSchema.index(
  {
    user: 1,
    room: 1,
    checkInDate: 1,
    checkOutDate: 1,
  },
  {
    unique: true,
    name: "unique_booking_dates",
  }
);

// Pre-save middleware to validate dates
bookingSchema.pre("save", function (next) {
  if (this.checkInDate >= this.checkOutDate) {
    next(new Error("Check-out date must be after check-in date"));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
