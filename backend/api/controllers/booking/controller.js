const BookingServices = require("../../services/booking.service");
const userService = require("../../services/user.service");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;

const today = moment().startOf("day");
const APIFeatures = require("../../../helpers/apiFeatures");

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await BookingServices.getBookingById(req.params.id).lean();
    const doctorData = await userService.getUserById(booking.doctorId).lean();
    const patientData = await userService.getUserById(booking.patientId).lean();

    return res.status(200).send({ ...booking, doctorData, patientData });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const role = req.user?.role;
    if (role === "patient") {
      const start = new Date().toDateString();
      const bookings = await Booking.find({
        $and: [
          { patientId: req.user?._id },
          { createdAt: { $gte: start } },
          { paymentStatus: "paid" },
          { visitType: "video" },
          { status: "up coming" },
        ],
      })
        .populate("patientId", { name: 1, email: 1, image: 1 })
        .populate("doctorId", { name: 1, email: 1, image: 1 });
      return res.status(200).json(bookings);
    } else {
      const start = new Date().toDateString();
      const appointments = await Booking.find({
        $and: [
          { doctorId: req.user?._id },
          { createdAt: { $gte: start } },
          { paymentStatus: "paid" },
          { status: "up coming" },
        ],
      })
        .populate("patientId", { name: 1, email: 1, image: 1 })
        .populate("doctorId", { name: 1, email: 1, image: 1 })
        .sort({ createdAt: -1 });

      return res.status(200).json(appointments);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getBooking = async (req, res, next) => {
  try {
    const role = req.user?.role;
    if (role === "patient") {
      const bookings = await Booking.find({
        $and: [
          { patientId: req.user?._id },
          { paymentStatus: "paid" },
          { visitType: req.query.visitType },
        ],
      })
        .populate("patientId", { name: 1, email: 1, image: 1 })
        .populate("doctorId", { name: 1, email: 1, image: 1 });
      return res.status(200).json(bookings);
    } else {
      const appointments = await Booking.find({
        $and: [
          { doctorId: req.user?._id },
          { paymentStatus: "paid" },
          { visitType: req.query.visitType },
        ],
      })
        .populate("patientId", { name: 1, email: 1, image: 1 })
        .populate("doctorId", { name: 1, email: 1, image: 1 })
        .sort({ createdAt: -1 });

      return res.status(200).json(appointments);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
