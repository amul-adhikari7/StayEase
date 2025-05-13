const Review = require('../models/reviewModel')
const Booking = require('../models/bookingModel')

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { hotelId, rating, comment } = req.body
    const userId = req.user.id // Assuming user is authenticated

    // Check if the user has a booking for the specified hotel
    const booking = await Booking.findOne({ user: userId, room: hotelId })
    if (!booking) {
      return res.status(403).json({
        success: false,
        message: 'You can only review hotels you have booked.'
      })
    }

    const review = new Review({ hotelId, userId, rating, comment })
    await review.save()

    res.status(201).json({ success: true, data: review })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Fetch reviews for a hotel
exports.getReviews = async (req, res) => {
  try {
    const { hotelId } = req.params
    const reviews = await Review.find({ hotelId }).populate('userId', 'name')

    res.status(200).json({ success: true, data: reviews })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    await Review.findByIdAndDelete(id)

    res
      .status(200)
      .json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
