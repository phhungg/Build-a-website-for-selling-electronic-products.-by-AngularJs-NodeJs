const Wishlist = require("./../db/wishlist");
async function addToWishList(userId, productId) {
  const wishlist = await Wishlist({
    userId: userId,
    productId: productId,
  });
  await wishlist.save();
  return wishlist.toObject();
}
async function reomoveWishlist(userId, productId) {
  await Wishlist.deleteMany({
    userId: userId,
    productId: productId,
  });
}
async function getWislist(userId) {
  let wishlist = await Wishlist.find({ userId: userId }).populate("productId");
  return wishlist.map((item) => item.toObject().productId);
}
module.exports = { addToWishList, reomoveWishlist, getWislist };
