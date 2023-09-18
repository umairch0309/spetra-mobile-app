const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

router.post("/ask-a-question", sanitizeData, controller.askQuestion);

module.exports = router;
