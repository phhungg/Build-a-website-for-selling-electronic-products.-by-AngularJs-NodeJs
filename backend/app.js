const expores = require("express");
const mongoose = require("mongoose");
const app = expores();
const cors = require("cors");
const port = 3000;
const categpryRoutes = require("./route/category");
const brandRoutes = require("./route/brand");
const productRoutes = require("./route/product");
const customerRoutes = require("./route/customer");
const authRoutes = require("./route/auth");
const orderRoutes = require("./route/order");
const staticRoutes = require("./route/static");
const chatRoutes = require("./route/chat");
const { verifyToken, roleAdmin } = require("./middle-ware/auth-middleware");
const commentRoutes = require("./route/comment");
app.use(cors());
app.use(expores.json());
app.use("/category", verifyToken, roleAdmin, categpryRoutes);
app.use("/brand", verifyToken, roleAdmin, brandRoutes);
app.use("/order", verifyToken, roleAdmin, orderRoutes);
app.use("/static", verifyToken, roleAdmin, staticRoutes);
app.use("/product", verifyToken, roleAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);
app.use("/comments", verifyToken, commentRoutes);
app.use("/chat", verifyToken, chatRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "Ecommer_Store",
  });
  console.log("mongodb connection");
}
connectDB().catch((err) => {
  console.log(err);
});
app.listen(port, () => {
  console.log("Server running on port ", port);
});
