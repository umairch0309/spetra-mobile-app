const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var messageSchema = new Schema(
  {
    chatRoomId: { type: mongoose.Schema.ObjectId, ref: "ChatRoom" },
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.ObjectId, ref: "User" },
    readStatus: { type: Boolean, default: false },
    file: { fileName: String, fileType: String, file: String },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
