const mongoose = require("mongoose");
const categorySChema = new mongoose.Schema({
  name: String,
});
const Category = mongoose.model("category", categorySChema);
module.exports = Category;
