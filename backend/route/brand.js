const express = require("express");
const {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("./../handles/brand-handles");
const router = express.Router();
router.post("", async (req, res) => {
  let model = req.body;
  let result = await addBrand(model);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "Updated" });
});
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "Deleted" });
});
router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let brand = await getBrandById(id);
  res.send(brand);
});
router.get("", async (req, res) => {
  let brand = await getBrands();
  res.send(brand);
});
module.exports = router;
