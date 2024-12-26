const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  name: String,
});

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;
