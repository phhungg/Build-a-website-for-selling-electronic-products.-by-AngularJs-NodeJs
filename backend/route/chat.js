const express = require("express");
const router = express.Router();
const Chat = require("../db/chat");
const User = require("../db/user");

// Gửi tin nhắn từ User
router.post("/", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    // Tạo tin nhắn mới
    const chatMessage = new Chat({ senderId, receiverId, message });
    await chatMessage.save();

    res.json(chatMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message." });
  }
});
router.get("/messages", async (req, res) => {
  const { userId, adminId } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: adminId },
        { senderId: adminId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages", error });
  }
});

module.exports = router;
