const mongoose = require("mongoose");

const PatProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    name: { type: String },
    email: { type: String },
    contactNo: { type: String },
    aboutMe: { type: String },
    status: {
      type: String,
      enum: ["declined", "approved"],
    },
    cardDetail: {
      cardNumber: { type: String },
      cardName: { type: String },
      cardDate: { type: String },
      cardCvv: { type: String },
    },
    status: { type: String, enum: ["active", "deactivate"], default: "active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patProfile", PatProfileSchema);
