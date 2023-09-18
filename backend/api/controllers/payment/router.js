const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

router.post("/process", sanitizeData, auth, controller.processPayment);

router.get("/stripeApi", sanitizeData, auth, controller.sendStripeApi);

module.exports = router;
