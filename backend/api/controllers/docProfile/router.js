const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

//Phone Number Verification
router.get("/send-code", sanitizeData, auth, controller.sendCode);
router.get("/verify-number", sanitizeData, auth, controller.verifyNumber);
// ----------------------------------------------------

//Booking
router.post("/new-booking", sanitizeData, auth, controller.newBooking);
//updateBooking
router.put("/update-booking", sanitizeData, auth, controller.updateBooking);
//removeBooking
router.put("/unpaid-booking", sanitizeData, auth, controller.unpaidBooking);

// ----------------------------------------------------

//Doctors
router.get("/alldocs", sanitizeData, controller.getDocsProfiles);
router.get("/:id", sanitizeData, controller.singleDocProfile);
router.get("/", sanitizeData, auth, controller.getDocProfile);
router.patch("/update/:id", sanitizeData, auth, controller.updateDocProfile);
router.patch(
  "/updateDocPersonal",
  sanitizeData,
  auth,
  controller.updateDocPersonal
);

router.patch(
  "/updateStatus",
  sanitizeData,
  auth,
  controller.updateBookingStatus
);

router.patch(
  "/update-mobile/:id",
  sanitizeData,
  auth,
  controller.updateDocProfileMobile
);

router.post("/new-docform", sanitizeData, controller.createDocForm);
router.put("/update-event", sanitizeData, auth, controller.updateEvent);
// router.get("/get-events/:id", controller.getEvents);
// ----------------------------------------------------

// Review
router.post("/new-review", sanitizeData, auth, controller.newReview);
router.get("/get-reviews/:doctorId", sanitizeData, controller.getReviews);
// ----------------------------------------------------

// Payments
router.get("/get-payments", sanitizeData, auth, controller.getPayments);
// ----------------------------------------------------

// ----------------------------------------------------

//Video
router.get("/video", sanitizeData, controller.video);
// ----------------------------------------------------

module.exports = router;
