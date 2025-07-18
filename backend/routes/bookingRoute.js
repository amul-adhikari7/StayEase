const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const { authGuard } = require("../middleware/authGuard");

// Get all bookings (Admin)
router.get("/all", authGuard, bookingController.getAllBookings);

// Get user's bookings
router.get("/user", authGuard, bookingController.getUserBookings);

// Get booking details by ID
router.get("/:id", authGuard, bookingController.getBookingDetails);

// Create a new booking
router.post("/create", authGuard, bookingController.createBooking);

// Update booking status
router.put("/update/:id", authGuard, bookingController.updateBookingStatus);


router.put("/:id/status", authGuard, bookingController.updateBookingStatus1);
// Delete booking
router.delete("/delete/:id", authGuard, bookingController.deleteBooking);

module.exports = router;
