const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

router.get("/get-chat-rooms", sanitizeData, auth, controller.getChatRooms);

router.put("/chat-room/:id", sanitizeData, auth, controller.updateChatRoom);

router.get("/get-messages/:id", sanitizeData, auth, controller.getMessages);

router.post("/post-messages", sanitizeData, auth, controller.postMessages);

router.get("/token", sanitizeData, auth, controller.chatToken);
router.patch("/updateFcmToken", sanitizeData, auth, controller.updateFcmToken);

router.patch("/read-messages/:id", auth, controller.allMessagesRead);
module.exports = router;
