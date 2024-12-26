const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: Date,
  items: Array(mongoose.Schema.Types.Mixed),
  paymentType: String,
  address: mongoose.Schema.Types.Mixed,
  status: String,
});
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
