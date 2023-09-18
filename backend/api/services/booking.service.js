const Booking = require("../models/booking");

//New Booking Object
const bookingObject = (req) => {
  return new Booking({
    ...req,
  });
};

// Save booking
const saveBooking = (booking) => {
  return booking.save();
};

// Get Doc All Appointments
const getBookings = (userId, visitType, userType, paymentStatus) => {
  console.log(userType);
  return Booking.find(
    userType === "doctor"
      ? {
          doctorId: userId,
          visitType,
        }
      : {
          patientId: userId,
          visitType,
          paymentStatus,
        }
  )
    .sort({ createdAt: -1 })
    .lean();
};

// Get Doc Dashboard Counts
const getDocDashboardCounts = async (doctorId) => {
  let appointments = await Booking.find({
    doctorId,
    visitType: "physical",
    status: "up coming",
  });

  let consultations = await Booking.find({
    doctorId,
    visitType: "video",
    status: "up coming",
  });

  let completed = await Booking.find({
    doctorId,
    visitType: "video",
    status: "completed",
  });

  let obj = {
    appointments: appointments.length,
    consultations: consultations.length,
    completed: completed.length,
  };

  return obj;
};

// Get Pat Dashboard Counts
const getPatDashboardCounts = async (patientId) => {
  let appointments = await Booking.find({
    patientId,
    visitType: "physical",
    status: "up coming",
  });
  let consultations = await Booking.find({
    patientId,
    visitType: "video",
    status: "up coming",
  });
  let completed = await Booking.find({
    patientId,
    visitType: "video",
    status: "completed",
  });

  let obj = {
    appointments: appointments.length,
    consultations: consultations.length,
    completed: completed.length,
  };
  return obj;
};

// Gte Bookings By Id
const getBookingById = (id) => {
  return Booking.findById(id);
};

const BookingServices = {
  bookingObject,
  saveBooking,
  getBookings,
  getDocDashboardCounts,
  getPatDashboardCounts,
  getBookingById,
};

module.exports = BookingServices;
