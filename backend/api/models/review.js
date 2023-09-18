const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.ObjectId, ref: "User" },
    bookingId: { type: mongoose.Schema.ObjectId, ref: "Booking" },
    rating: { type: Number, default: 0 },
    message: { type: String },
    visitType: { type: String, enum: ["physical", "video"] },
    patientId: { type: mongoose.Schema.ObjectId, ref: "User" },
    waitingRating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
