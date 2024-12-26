const Product = require("./../db/product");
async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}
async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}
async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}
async function getAllProduct() {
  let products = await Product.find();
  return products.map((product) => product.toObject());
}
async function getProductById(id) {
  let product = await Product.findById(id);
  return product.toObject();
}
async function getFeatured() {
  let featuredProduct = await Product.find({
    isFeatured: true,
  });
  return featuredProduct.map((featuredProduct) => featuredProduct.toObject());
}
async function getNew() {
  let newProduct = await Product.find({
    isNewProduct: true,
  });
  return newProduct.map((newProduct) => newProduct.toObject());
}
async function getProductListing(
  searchItem,
  categoryId,
  page,
  pagesize,
  sortBy,
  sortOrder,
  brandId
) {
  if (!sortBy) {
    sortBy = "price";
  }
  if (!sortOrder) {
    sortOrder = -1;
  }
  let queryFillter = {};
  if (searchItem) {
    queryFillter.$or = [
      {
        name: { $regex: ".*" + searchItem + ".*" },
      },
      {
        shortDescription: { $regex: ".*" + searchItem + ".*" },
      },
    ];
  }
  if (categoryId) {
    queryFillter.categoryId = categoryId;
  }
  if (brandId) {
    queryFillter.brandId = brandId;
  }
  const product = await Product.find(queryFillter)
    .sort({
      [sortBy]: +sortOrder,
    })
    .skip((page - 1) * pagesize)
    .limit(+pagesize);
  return product.map((product) => product.toObject());
}
module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  getNew,
  getFeatured,
  getProductListing,
};
