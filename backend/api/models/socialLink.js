const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocialLink", socialLinkSchema);
