const mongoose = require("mongoose");

const DocFormSchema = new mongoose.Schema(
  {

    name: { type: String },
    email: { type: String },
    contactNo: { type: String },
    status: {
      type: String,
      enum: ["declined", "inReview", "approved"],
      default: "inReview",
    },
    aboutMe: { type: String },
    speciality: {
      description: { type: String },
      name: { type: String },
      image: { type: Object },
    },
    practices: [{ type: String }],
    hospital: [{ type: String }],
    experince: { type: String },
    education: [{ type: String }],
    languages: [{ code: { type: String }, name: { type: String } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("docForm", DocFormSchema);
