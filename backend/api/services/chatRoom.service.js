const ChatRoom = require("../models/chatRoom");
const Message = require("../models/message");
const User = require("../models/user");

//New Chat Room Object
const chatRoomObject = (req) => {
  return new ChatRoom({
    ...req,
  });
};

// Save Chat Room
const saveChatRoom = (chatRoom) => {
  return chatRoom.save();
};

// Get Chat By Doc Id
const getChatRoomByDocId = async (doctorId) => {
  const rooms = await ChatRoom.find({ doctorId })
    .sort({ updatedAt: -1 })
    .lean();
  let resData = [];
  for (const room of rooms) {
    const userData = await User.findById(room.patientId, {
      name: 1,
      image: 1,
    }).lean();
    resData.push({ ...userData, ...room });
  }
  return resData;
};

// Get Chat By Pat Id
const getChatRoomByPatId = async (patientId) => {
  const rooms = await ChatRoom.find({ patientId })
    .sort({ updatedAt: -1 })
    .lean();
  let resData = [];
  for (const room of rooms) {
    const userData = await User.findById(room.doctorId, {
      name: 1,
      image: 1,
    }).lean();
    resData.push({ ...userData, ...room });
  }
  return resData;
};
// Get Chat By Pat Id
const updateChatRoom = async (id, body) => {
  const res = await ChatRoom.findByIdAndUpdate(id, { $set: { ...body } });
  return res;
};

//Get Room All Messages
const getMsgsByChatRoomId = (id) => {
  return Message.find({ chatRoomId: id });
};

//New Message Object
const messageObject = (req) => {
  return new Message({
    ...req,
  });
};

// Save Message
const saveMessage = (message) => {
  return message.save();
};

const ChatRoomServices = {
  chatRoomObject,
  saveChatRoom,
  getChatRoomByDocId,
  getChatRoomByPatId,
  getMsgsByChatRoomId,
  messageObject,
  saveMessage,
  updateChatRoom,
};

module.exports = ChatRoomServices;
