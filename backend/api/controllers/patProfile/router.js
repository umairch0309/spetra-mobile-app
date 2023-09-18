const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

//Patient
router.get("/", sanitizeData, auth, controller.getPatProfile);
router.put("/update", sanitizeData, auth, controller.updatePatProfile);

//Notification
router.get(
  "/get-notifications",
  sanitizeData,
  auth,
  controller.getNotifications
);

//Payments
router.get("/get-payments", sanitizeData, auth, controller.getPayments);

module.exports = router;
