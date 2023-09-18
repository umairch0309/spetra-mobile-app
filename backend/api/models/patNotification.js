const mongoose = require("mongoose");

const patNotificationSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.ObjectId, ref: "Booking" },
    booking: { type: Object },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatNotification", patNotificationSchema);
