import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ...existing code...

const ReviewComponent = ({ roomId, userId, reviews }) => {
  const [reviewText, setReviewText] = useState('')

  const hasUserReviewed = () => {
    return reviews.some(review => review.userId === userId)
  }

  const handleReviewSubmit = () => {
    if (hasUserReviewed()) {
      toast.error('You cannot review more than once')
      return
    }
    // ...existing code to submit review...
  }

  return (
    <div>
      {/* ...existing code... */}
      <button onClick={handleReviewSubmit}>Submit Review</button>
      <ToastContainer />
    </div>
  )
}

export default ReviewComponent
