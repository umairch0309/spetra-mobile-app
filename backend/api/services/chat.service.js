const Message = require("../models/message");

exports.saveMessage = async (payload) => {
  try {
    const { chatRoomId, sender, receiver, message } = payload;

    return await Message.create({
      chatRoomId,
      sender,
      receiver,
      message,
    });
  } catch (error) {
    return;
  }
};
exports.saveFile = async (payload) => {
  try {
    const { chatRoomId, sender, receiver, file } = payload;

    const temp = await Message.create({
      chatRoomId,
      sender,
      receiver,
      file,
    });
    temp.save();
    return temp;
  } catch (error) {
    return;
  }
};

// Get Chat By Provide Id
