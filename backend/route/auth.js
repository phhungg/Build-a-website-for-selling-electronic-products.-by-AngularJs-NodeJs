const express = require("express");
const { registerUser, loginUser } = require("../handles/auth-handler");
const User = require("../db/user");
const router = express.Router();
router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    await registerUser(model);
    res.send({
      message: "Đăng kí thành công !",
    });
  } else {
    res.status(400).json({
      error: "Vui lòng cung cấp đủ tên, email và mật khẩu",
    });
  }
});
router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    const result = await loginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(401).json({
        error: "Sai tên đăng nhập hoặc mật khẩu",
      });
    }
  } else {
    res.status(400).json({
      error: "Vui lòng cung cấp email và mật khẩu",
    });
  }
});
module.exports = router;
