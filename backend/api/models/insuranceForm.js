const mongoose = require("mongoose");

const InsuranceFormSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    insuranceCompany: { type: String },
    planName: { type: String },
    patientName: { type: String },
    primaryInsuranceName: { type: String },
    patientDOB: { type: String },
    primaryInsuranceDOB: { type: String },
    policyNo: { type: String },
    groupNo: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("insuranceForm", InsuranceFormSchema);
