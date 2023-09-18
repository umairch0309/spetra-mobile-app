const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingDate: {
      start: { type: String },
      end: { type: String },
    },
    visitType: { type: String, enum: ["physical", "video"] },
    seenBefore: { type: Boolean, default: false },
    reasonOfVisit: { type: String },
    patientId: { type: mongoose.Schema.ObjectId, ref: "User" },
    noteForDoctor: { type: String },
    doctorId: { type: mongoose.Schema.ObjectId, ref: "User" },
    fee: { type: String },
    status: {
      type: String,
      enum: ["up coming", "completed"],
      default: "up coming",
    },

    phoneNumber: { type: String },
    slotId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
    chatRoomId: {
      type: String,
    },
    location: {
      address: String,
      city: String,
      area: String,
      state: String,
      lng: Number,
      lat: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
