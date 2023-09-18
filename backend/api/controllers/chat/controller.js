const { chatToken } = require("../../../helpers/chatToken");
const ChatRoomService = require("../../services/chatRoom.service");
const ChatRoom = require("../../models/chatRoom");
const Message = require("../../models/message");
const User = require("../../models/user");

// /api/v1/chat/token
exports.chatToken = async (req, res, next) => {
  try {
    const identity = req.user._id.toString();
    const token = chatToken(identity);

    return res.status(200).send({
      identity: token.identity,
      token: token.toJwt(),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//----------------------------------------------------------------------
//-------------------- GET CHAT ROOM -------------------------
//----------------------------------------------------------------------
exports.getChatRooms = async (req, res, next) => {
  try {
    let chat = await ChatRoom.aggregate([
      {
        $match: {
          $or: [{ doctorId: req.user?._id }, { patientId: req.user?._id }],
          $and: [{ isDeleted: false }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctorId",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "patientId",
          foreignField: "_id",
          as: "patientId",
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "chatRoomId",
          as: "messages",
          pipeline: [
            {
              $sort: { createdAt: -1 },
            },
          ],
        },
      },
      {
        $unwind: { path: "$patientId" },
      },
      {
        $unwind: { path: "$doctorId" },
      },
      {
        $addFields: {
          last_message: {
            $arrayElemAt: ["$messages", 0],
          },
        },
      },
      {
        $addFields: {
          unread_messages: {
            $filter: {
              input: "$messages",
              as: "message",
              cond: {
                $and: [
                  { $eq: ["$$message.readStatus", false] },
                  {
                    $eq: ["$$message.receiver", req.user._id],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $sort: {
          "last_message.createdAt": -1,
        },
      },
      {
        $project: {
          createdAt: 1,
          chatRoomType: 1,
          doctorId: 1,
          bookingId: 1,
          patientId: 1,
          unread_count: { $size: "$unread_messages" },
          last_message: 1,
        },
      },
      {
        $project: {
          "doctorId.password": 0,
          "doctorId.confirmPassword": 0,
          "patientId.password": 0,
          "patientId.confirmPassword": 0,
        },
      },
    ]);

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// /api/v1/chat/get-chat-rooms/:id
exports.getChatRoom = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    const chat = await (role === "doctor"
      ? ChatRoomService.getChatRoomByDocId(userId)
      : ChatRoomService.getChatRoomByPatId(userId));
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// /api/v1/chat/chat-room/:id
exports.updateChatRoom = async (req, res, next) => {
  try {
    const { body } = req;
    const id = req.params.id;
    const chat = await ChatRoomService.updateChatRoom(id, body);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// api/v1/chat/get-messages/:id
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await ChatRoomService.getMsgsByChatRoomId(req.params.id);

    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//----------------------------------------------------------------------
//-------------------- POST MESSAGES -------------------------
//----------------------------------------------------------------------
// api/v1/chat/post-messages
exports.postMessages = async (req, res, next) => {
  try {
    const { chatRoomId, sender, receiver, message } = req.body;
    const messageObj = new Message({
      chatRoomId,
      sender,
      receiver,
      message,
    });
    await messageObj.save();

    const receiverObj = await User.findById(receiver).lean();

    if (receiverObj.fcmToken) {
      const notification = {
        // to: "eslAuHsAPkh-u3nDTHdosC:APA91bFLtgpVaxXzDQ8JvOC-I9WuDOkObE1WPhJqmdXnM-_tdLWumN7s5oxtgoXOFGThcfN9rFtZuFYCxo_vOo-nX-Yc_DDGa7rCroWskkcvlRXd6H7-00qMHRNE555sXvzIcLO6y2cf",
        to: `${receiverObj?.fcmToken}`,
        collapse_key: "",
        notification: {
          title: `Message from ${req.user?.name || req.user?.userName}`,
          body: `${message}`,
        },
        data: {
          //you can send only notification or only data(or include both)
          type: "message",
          chatRoomId,
          message,
          receiver: receiverObj,
        },
      };
      fcm.send(notification, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    }

    return res.status(200).send(messageObj);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// api/v1/chat/post-messages
exports.postMessage = async (req, res, next) => {
  try {
    const { chatRoomId, to, from, message } = req.body;
    const messageObj = await ChatRoomService.messageObject({
      chatRoomId,
      to,
      from,
      message,
    });

    const newMessage = await ChatRoomService.saveMessage(messageObj);

    return res.status(200).send(newMessage);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//----------------------------------------------------------------------
//-------------------- UPDATE FCM TOKEN -------------------------
//----------------------------------------------------------------------

exports.updateFcmToken = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, {
      $set: { fcmToken: req.body.fcmToken },
    });

    res.status(200).json({ message: "Fcm Token Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//----------------------------------------------------------------------
//-------------------- Mark all as read -------------------------
//----------------------------------------------------------------------

exports.allMessagesRead = (req, res) =>
  Message.updateMany({ chatRoomId: req.params.id }, { readStatus: true })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: "All messages marked as read" })
    )
    .catch((err) => res.status(400).json({ message: err.message }));
