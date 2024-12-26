const mongoose = require("mongoose");
const usserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: Boolean,
});
const User = mongoose.model("user", usserSchema);
module.exports = User;
