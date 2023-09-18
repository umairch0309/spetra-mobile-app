const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { sanitizeData } = require("../../../helpers/security");

//Booking
router.get("/today-Upcoming", auth, controller.getBookings);

router.get("/:id", sanitizeData, auth, controller.getBookingById);
router.get("/", auth, controller.getBooking);

module.exports = router;
