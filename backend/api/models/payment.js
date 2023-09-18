const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.ObjectId, ref: "User" },
    bookingId: { type: mongoose.Schema.ObjectId, ref: "Booking" },
    doctorId: { type: mongoose.Schema.ObjectId, ref: "User" },
    fee: { type: Number },
    condition: { type: String },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
