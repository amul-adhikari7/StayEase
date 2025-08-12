const mongoose = require("mongoose");

class BookingModel {
  constructor() {
    this.schema = new mongoose.Schema({
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

    // Add schema index
    this.schema.index(
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

    // Add pre-save middleware
    this.schema.pre("save", this.validateDates);

    // Create and return the model
    return mongoose.model("Booking", this.schema);
  }

  // Method to validate dates
  validateDates(next) {
    if (this.checkInDate >= this.checkOutDate) {
      next(new Error("Check-out date must be after check-in date"));
    }
    next();
  }

  // Static method to create a new booking
  static async createBooking(bookingData) {
    try {
      const booking = new this(bookingData);
      return await booking.save();
    } catch (error) {
      throw error;
    }
  }

  // Static method to find bookings by user
  static async findByUser(userId) {
    return this.find({ user: userId }).populate("room");
  }

  // Static method to find bookings by room
  static async findByRoom(roomId) {
    return this.find({ room: roomId }).populate("user");
  }

  // Static method to update booking status
  static async updateStatus(bookingId, status) {
    return this.findByIdAndUpdate(bookingId, { status }, { new: true });
  }
}

const Booking = new BookingModel();
module.exports = Booking;
