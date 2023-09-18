const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

router.post("/video/token", sanitizeData, auth, controller.videoToken);

router.get(
  "/participant/video/token",
  sanitizeData,
  auth,
  controller.participantVideoToken
);

module.exports = router;
