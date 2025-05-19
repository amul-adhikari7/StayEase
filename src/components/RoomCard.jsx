import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addReviewApi,
  fetchReviewsForHotelApi,
  fetchUserBookingsApi,
} from "../apis/api";
import "../components/ReviewComponent.css";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const { _id, roomName, hotelName, price, location, noOfBeds, image } = room;

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    const checkBooking = async () => {
      try {
        const response = await fetchUserBookingsApi();
        const bookings = response.data;
        const hasBooking = bookings.some(
          (booking) => booking.room === room._id
        );
        setCanReview(hasBooking);
      } catch (error) {
        console.error("Error checking bookings:", error);
      }
    };

    checkBooking();
  }, [room._id]);

  const fetchReviews = async () => {
    try {
      const response = await fetchReviewsForHotelApi(room._id);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddReview = async () => {
    try {
      await addReviewApi({ hotelId: room._id, ...newReview });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const styles = {
    card: {
      width: "300px",
      backgroundColor: "#FFF7ED",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
      cursor: "pointer",
      margin: "20px auto",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#2C2C2C",
    },
    subtitle: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "8px",
      textAlign: "left",
    },
    location: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "15px",
      textAlign: "left",
    },
    infoSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: "500",
      color: "#2C2C2C",
    },
    iconText: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    price: {
      color: "#2C7A1F",
      fontWeight: "bold",
    },
  };

  const handleCardClick = () => {
    navigate(`/room/${_id}`); // Navigate to the detailed view page
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={handleCardClick}
    >
      <img
        src={`http://localhost:5000/rooms/${image}`}
        alt={roomName}
        style={styles.image}
      />
      <h4 style={styles.title}>{hotelName}</h4>
      <p style={styles.subtitle}>
        <strong>Room Type:</strong> {roomName}
      </p>
      <p style={styles.location}>
        <strong>Location:</strong> {location}
      </p>
      <div style={styles.infoSection}>
        <div style={styles.iconText}>🛏️ {noOfBeds} Beds</div>
        <div style={styles.price}>NPR {price}</div>
      </div>
      <div className="review-section">
        <h4 className="review-title">Reviews</h4>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <p className="review-comment">"{review.comment}"</p>
              <p className="review-rating">Rating: {review.rating} ⭐</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
        {canReview && (
          <div className="add-review">
            <h5>Add Your Review</h5>
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              className="review-input"
            />
            <textarea
              placeholder="Write your comment here..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="review-textarea"
            />
            <button onClick={handleAddReview} className="review-submit-button">
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
