const express = require("express");
const router = express.Router();
const { productController } = require("./../controllers/products");

const { protect } = require("../middlewares/auth");
const upload = require("./../middlewares/upload");

router.post("/", protect, upload.single("photo"), productController.insert);
router.get("/", productController.getAllData);
router.get("/detail/:id", productController.detail);
router.get("/toko", protect, productController.getDataToko);
router.put("/:id", upload.single("photo"), productController.updateProducts);
router.delete("/:id", protect, productController.delete);
router.put("/archive/:id", productController.doArchive);
router.put("/activate/:id", productController.activate);
router.get("/archive/", protect, productController.getDataArchive);

module.exports = router;
