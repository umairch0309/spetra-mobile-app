const Review = require("../models/review");

const reviewObj = (req) => {
  return new Review({
    ...req,
  });
};

const saveReview = (review) => {
  return review.save();
};

const getReviewByDocId = (doctorId) => {
  return Review.find({ doctorId });
};

const getReviewByBookingId = (bookingId) => {
  return Review.find({ bookingId });
};

const ReviewServices = {
  reviewObj,
  saveReview,
  getReviewByDocId,
  getReviewByBookingId,
};

module.exports = ReviewServices;
