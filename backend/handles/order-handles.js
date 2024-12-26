const Order = require("./../db/order");
async function addOrder(userId, orderModel) {
  let order = new Order({
    ...orderModel,
    userId: userId,
    status: "Đang xử lí ",
  });
  await order.save();
}
async function getCustomerOrder(userId) {
  let order = await Order.find({ userId: userId });
  return order.map((order) => order.toObject());
}
async function getOrders() {
  let orders = await Order.find();
  return orders.map((x) => x.toObject());
}
async function updateOrder(id, status) {
  await Order.findByIdAndUpdate(id, {
    status: status,
  });
}
module.exports = {
  addOrder,
  getCustomerOrder,
  getOrders,
  updateOrder,
};
