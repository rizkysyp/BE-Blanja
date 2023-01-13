const express = require("express");
const router = express.Router();
const UserRouter = require("../routes/users");
const ProductRouter = require("../routes/products");
const BagRouter = require("./bag");
const OrderRouter = require("./order");

router.use("/users", UserRouter);
router.use("/products", ProductRouter);
router.use("/bag", BagRouter);
router.use("/order", OrderRouter);
module.exports = router;
