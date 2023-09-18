const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
