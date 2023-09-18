const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { sanitizeData } = require("../../../helpers/security");

//Notifications
router.get("/", sanitizeData, auth, controller.getNotifications);
router.delete("/", sanitizeData, auth, controller.deletetNotifications);

router.get("/my-notifications", controller.myNotifications);

router.patch("/mark-as-read", controller.markAllAsRead);
module.exports = router;
