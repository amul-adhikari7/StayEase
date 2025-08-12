const mongoose = require("mongoose");

class ReviewModel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hotel",
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    // Add instance methods
    this.schema.methods.updateReview = function (rating, comment) {
      this.rating = rating;
      this.comment = comment;
      return this.save();
    };

    // Add static methods
    this.schema.statics.getHotelReviews = function (hotelId) {
      return this.find({ hotelId }).populate("userId", "name");
    };

    this.schema.statics.getAverageRating = async function (hotelId) {
      const result = await this.aggregate([
        { $match: { hotelId: new mongoose.Types.ObjectId(hotelId) } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]);
      return result[0]?.avgRating || 0;
    };

    return mongoose.model("Review", this.schema);
  }

  // Static factory method
  static async createReview(reviewData) {
    const Review = mongoose.model("Review");
    const review = new Review(reviewData);
    return await review.save();
  }

  // Static utility methods
  static async getUserReviews(userId) {
    const Review = mongoose.model("Review");
    return Review.find({ userId }).populate("hotelId");
  }
}

const Review = new ReviewModel();
module.exports = Review;
