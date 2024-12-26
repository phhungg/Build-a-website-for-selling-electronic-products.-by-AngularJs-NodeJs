const express = require("express");
const router = express.Router();
const { getOrders, updateOrder } = require("../handles/order-handles");

router.get("", async (req, res) => {
  const order = await getOrders();
  res.send(order);
});
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  await updateOrder(id, status);
  res.send({ message: "updated" });
});

module.exports = router;
