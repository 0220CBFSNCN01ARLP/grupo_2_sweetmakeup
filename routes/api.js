var express = require("express");
var router = express.Router();

const imagesRouter = require("./api/images");
const productsRouter = require("./api/products");

router.use("/products", productsRouter);
router.use("/images", imagesRouter)

module.exports = router;
