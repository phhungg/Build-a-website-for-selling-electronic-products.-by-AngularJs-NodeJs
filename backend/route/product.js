const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} = require("../handles/product-handles");
const router = express.Router();
router.post("/", async (req, res) => {
  let model = req.body;
  let product = await addProduct(model);
  res.send(product);
});
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "updated" });
});
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "deleted" });
});
router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let product = await getProductById(id);
  res.send(product);
});
router.get("/", async (req, res) => {
  let products = await getAllProduct();
  res.send(products);
});
module.exports = router;
