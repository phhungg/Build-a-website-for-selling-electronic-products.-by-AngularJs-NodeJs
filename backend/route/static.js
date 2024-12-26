const express = require("express");
const router = express.Router();
const Order = require("../db/order");
const moment = require("moment");
const Product = require("../db/product"); // Import model Product nếu bạn cần thông tin chi tiết về sản phẩm

// API tính tổng doanh thu theo sản phẩm
router.get("/total", async (req, res) => {
  try {
    // Tìm tất cả các đơn hàng
    const orders = await Order.find();

    // Khởi tạo một đối tượng để lưu tổng doanh thu cho mỗi sản phẩm
    let revenuePerProduct = {};

    // Duyệt qua tất cả đơn hàng
    orders.forEach((order) => {
      // Duyệt qua các item trong đơn hàng
      order.items.forEach((item) => {
        // Giả sử mỗi item có thông tin sản phẩm (_id, giá, discount) và số lượng
        const productId = item.product._id;
        const productPrice = item.product.price;
        const quantity = item.quantity;
        const discount = item.product.discount || 0;

        // Tính doanh thu cho mỗi sản phẩm sau khi trừ chiết khấu
        const revenue = productPrice * quantity * ((100 - discount) / 100);

        // Cập nhật tổng doanh thu cho sản phẩm
        if (revenuePerProduct[productId]) {
          revenuePerProduct[productId].totalRevenue += revenue;
          revenuePerProduct[productId].totalQuantitySold += quantity;
        } else {
          revenuePerProduct[productId] = {
            totalRevenue: revenue,
            totalQuantitySold: quantity,
            productName: item.product.name, // Lưu tên sản phẩm để trả về
          };
        }
      });
    });

    // Chuyển đổi đối tượng thành mảng để trả về
    const revenueList = Object.values(revenuePerProduct);
    res.json(revenueList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/monthly/:year/:month", async (req, res) => {
  const { year, month } = req.params;

  try {
    // Chuyển đổi năm và tháng thành ngày bắt đầu và ngày kết thúc của tháng
    const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Tìm tất cả các đơn hàng trong tháng đã chọn
    const orders = await Order.find({
      date: { $gte: startDate, $lte: endDate },
      status: "Hoàn thành", // Chỉ tính những đơn hàng đã hoàn thành
    });

    // Khởi tạo một đối tượng để lưu tổng doanh thu cho mỗi sản phẩm
    let revenuePerProduct = {};

    // Duyệt qua tất cả đơn hàng
    for (const order of orders) {
      // Duyệt qua các item trong đơn hàng
      for (const item of order.items) {
        // Kiểm tra xem item có đầy đủ thông tin sản phẩm hay không
        const product = item.product;
        if (!product) {
          continue; // Nếu không có thông tin sản phẩm thì bỏ qua
        }

        const productId = product._id;
        const productPrice = product.price;
        const quantity = item.quantity;
        const discount = product.discount || 0;

        // Tính doanh thu cho mỗi sản phẩm sau khi trừ chiết khấu
        const revenue = productPrice * quantity * ((100 - discount) / 100);

        // Cập nhật tổng doanh thu cho sản phẩm
        if (revenuePerProduct[productId]) {
          revenuePerProduct[productId].totalRevenue += revenue;
          revenuePerProduct[productId].totalQuantitySold += quantity;
        } else {
          revenuePerProduct[productId] = {
            totalRevenue: revenue,
            totalQuantitySold: quantity,
            productName: product.name, // Lưu tên sản phẩm để trả về
          };
        }
      }
    }

    // Chuyển đổi đối tượng thành mảng để trả về
    const revenueList = Object.values(revenuePerProduct);

    // Trả về tổng doanh thu theo từng sản phẩm
    res.json({ totalRevenue: revenueList });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Lỗi khi tính doanh thu theo tháng" });
  }
});

module.exports = router;
