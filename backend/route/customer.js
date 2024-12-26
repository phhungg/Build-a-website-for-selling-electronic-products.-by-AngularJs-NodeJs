const express = require("express");
const {
  getNew,
  getFeatured,
  getProductListing,
  getProductById,
} = require("../handles/product-handles");
const { getCategory } = require("../handles/category-handles");
const { getBrands } = require("../handles/brand-handles");
const {
  getWislist,
  addToWishList,
  reomoveWishlist,
} = require("../handles/wishlist-handles");
const {
  getCart,
  addToCart,
  removeToCart,
  clearCart,
} = require("../handles/shopping-cart-hadles");
const { addOrder, getCustomerOrder } = require("../handles/order-handles");
const router = express.Router();
router.get("/new", async (req, res) => {
  const products = await getNew();
  res.send(products);
});
router.get("/featured", async (req, res) => {
  const products = await getFeatured();
  res.send(products);
});
router.get("/category", async (req, res) => {
  const categories = await getCategory();
  res.send(categories);
});
router.get("/brand", async (req, res) => {
  const brand = await getBrands();
  res.send(brand);
});
router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  res.send(product);
});
router.get("/listing", async (req, res) => {
  const { searchItem, categoryId, sortBy, sortorder, brandId, pageSize, page } =
    req.query;
  const product = await getProductListing(
    searchItem,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortorder,
    brandId
  );
  res.send(product);
});
router.get("/wishlist", async (req, res) => {
  const userId = req.user.id;
  const item = await getWislist(userId);
  res.send(item);
});
router.post("/wishlist/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await addToWishList(userId, productId);
  res.send(item);
});
router.delete("/wishlist/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  await reomoveWishlist(userId, productId);
  res.send({ message: "Deleted" });
});
router.get("/cart", async (req, res) => {
  const userId = req.user.id;
  const item = await getCart(userId);
  res.send(item);
});
router.post("/cart/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity;
  const item = await addToCart(userId, productId, quantity);
  res.send(item);
});
router.delete("/cart/:id", async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await removeToCart(userId, productId);
  res.send(item);
});
router.post("/order", async (req, res) => {
  const userId = req.user.id;
  const order = req.body;
  await addOrder(userId, order);
  await clearCart(userId);
  return res.send({
    message: "Order created successfully",
  });
});
router.get("/order", async (req, res) => {
  const userId = req.user.id;
  const orders = await getCustomerOrder(userId);
  res.send(orders);
});
module.exports = router;
