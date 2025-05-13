const router = require('express').Router()
const {
  addReview,
  getReviews,
  deleteReview
} = require('../controller/reviewController')
const { authGuard } = require('../middleware/authGuard')

// Add a review
router.post('/add', authGuard, addReview)

// Get reviews for a hotel
router.get('/:hotelId', getReviews)

// Delete a review
router.delete('/:id', authGuard, deleteReview)

module.exports = router
