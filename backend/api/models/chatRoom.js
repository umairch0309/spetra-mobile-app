const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.ObjectId, ref: "User" },
    doctorId: { type: mongoose.Schema.ObjectId, ref: "User" },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    chatRoomType: {
      type: String,
    },
    patCondition: { type: String },
    new: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
