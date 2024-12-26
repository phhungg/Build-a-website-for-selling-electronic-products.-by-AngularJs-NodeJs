const mongoose = require("mongoose");
const { Schema } = mongoose;
const wishlistSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});
const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
