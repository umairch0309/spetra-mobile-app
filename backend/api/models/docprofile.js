const mongoose = require("mongoose");

const DocProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    name: { type: String },
    email: { type: String },
    contactNo: { type: String },
    languages: [{ code: { type: String }, name: { type: String } }],
    aboutMe: { type: String },
    // status: {
    //   type: String,
    //   enum: ["declined", "approved"],
    // },
    location: {
      address: String,
      city: String,
      area: String,
      state: String,
      lng: Number,
      lat: Number,
    },
    isVideo: { type: Boolean, default: true },
    speciality: {
      description: { type: String },
      name: { type: String },
      image: { type: Object },
    },
    practices: [{ type: String }],
    hospital: [{ type: String }],
    experince: { type: String },
    education: [{ type: String }],
    phoneNo: { type: String },
    rating: { type: Number, default: 0 },
    waitingRating: { type: Number, default: 0 },
    noOfReview: { type: Number, default: 0 },
    cardDetail: {
      cardNumber: { type: String },
      cardName: { type: String },
      cardDate: { type: String },
      cardCvv: { type: String },
    },
    videoPrice: { type: String, default: 20 },
    physicalPrice: { type: String, default: 30 },
    physicalTimeSlot: [
      {
        start: String,
        end: String,
        title: String,
        isReserved: { type: Boolean, default: false },
        eventDetail: {
          name: { type: String },
          phoneNo: { type: String },
          bookingStatus: { type: String },
        },
        status: {
          type: String,
          enum: ["new", "booked", "completed"],
          default: "new",
        },
      },
    ],
    videoTimeSlot: [
      {
        start: String,
        end: String,
        title: String,
        isReserved: { type: Boolean, default: false },
        eventDetail: {
          name: { type: String },
          phoneNo: { type: String },
          bookingStatus: { type: String },
        },
        status: {
          type: String,
          enum: ["new", "booked", "completed"],
          default: "new",
        },
      },
    ],
    status: { type: String, enum: ["active", "deactivate"], default: "active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("docProfile", DocProfileSchema);
