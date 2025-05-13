const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

// Create a Booking
exports.createBooking = async (req, res) => {
    try {
        const { roomId, checkInDate, duration, guests, paymentType } = req.body;

        // Validate paymentType
        if (!["Cash", "Esewa"].includes(paymentType)) {
            return res.status(400).json({ message: "Invalid payment type" });
        }

        // Fetch the room details
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Calculate the total price
        const totalPrice = room.price * duration;

        // Create a new booking
        const booking = new Booking({
            user: req.user.id, // Assumes user authentication middleware provides `req.user`
            room: roomId,
            checkInDate,
            duration,
            guests,
            totalPrice,
            paymentType,
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to create booking", error });
    }
};

// Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("room", "roomName hotelName image location price");
        res.status(200).json({ message: "Bookings fetched successfully", bookings });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings", error });
    }
};

// Get User's Bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("room", "roomName hotelName location image")
            .populate("user", "name email phone");

        console.log("Bookings with populated data:", bookings);
        res.status(200).json({ message: "User bookings fetched successfully", bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Failed to fetch user bookings", error });
    }
};

// Get Booking Details by ID
exports.getBookingDetails = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await Booking.findById(bookingId)
            .populate("user", "name email phone")
            .populate("room", "roomName hotelName location price");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking details fetched successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch booking details", error });
    }
};

// Update Booking Status (Admin)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Failed to update booking status", error });
    }
};
exports.updateBookingStatus1 = async (req, res) => {
    try {
        console.log("Request params:", req.params); // Log request parameters
        console.log("Request body:", req.body); // Log request body

        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = status;
        await booking.save();

        console.log("Updated booking:", booking); // Log updated booking

        res.status(200).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        console.error("Error updating booking status:", error); // Log errors
        res.status(500).json({ message: "Failed to update booking status", error });
    }
};


// Delete a Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await booking.deleteOne();
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete booking", error });
    }
};
