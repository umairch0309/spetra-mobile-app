const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    notification: { type: String },
    type: { type: String, default: "Consultation" },
    data: { type: mongoose.Schema.ObjectId, refPath: "type" },
    isSeen: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", notificationSchema);
