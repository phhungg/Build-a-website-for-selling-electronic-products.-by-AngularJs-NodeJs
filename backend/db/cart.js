const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
  quantity: Number,
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
