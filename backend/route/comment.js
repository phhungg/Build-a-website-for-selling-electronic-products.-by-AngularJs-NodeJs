const express = require("express");
const Comment = require("../db/comment");
const router = express.Router();

// Thêm đánh giá
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId }).populate(
      "userId",
      "name"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 2: Thêm comment mới
router.post("/", async (req, res) => {
  try {
    const { userId, productId, comment } = req.body;
    if (!userId || !productId || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({ userId, productId, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route để cập nhật bình luận
router.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true } // Trả về document sau khi update
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API 4: Xóa comment
router.delete("/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
