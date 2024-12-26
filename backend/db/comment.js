const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
  comment: String,
  createdAt: Date,
});
const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
