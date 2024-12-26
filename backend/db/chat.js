const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "user" },
  receiverId: { type: Schema.Types.ObjectId, ref: "user" },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model("chats", chatSchema);
module.exports = Chat;
