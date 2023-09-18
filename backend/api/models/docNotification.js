const mongoose = require("mongoose");

const docNotificationSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.ObjectId, ref: "Booking" },
    booking: { type: Object },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DocNotification", docNotificationSchema);
