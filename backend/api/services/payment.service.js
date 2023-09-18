const Payment = require("../models/payment");

//New Payment Object
const paymentObj = (req) => {
  return new Payment({
    ...req,
  });
};

// Save Payment
const savePayment = (payment) => {
  return payment.save();
};

// Get All Payment
const getPaymentByDocId = (id, count) => {
  return Payment.find({ doctorId: id })
    .sort({ createdAt: -1 })
    .limit(Number(count))
    .lean();
};

// Get All Payment Of Pat
const getPaymentByPatId = (id, count) => {
  return Payment.find({ patientId: id })
    .sort({ createdAt: -1 })
    .limit(Number(count))
    .lean();
};

const PaymentServices = {
  paymentObj,
  savePayment,
  getPaymentByDocId,
  getPaymentByPatId,
};

module.exports = PaymentServices;
