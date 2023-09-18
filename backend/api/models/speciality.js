const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      name: { type: String, default: "None" },
      url: { type: String, default: "None" },
      mimeType: { type: String, default: "None" },
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Speciality", specialitySchema);
