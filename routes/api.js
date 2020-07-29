var express = require("express");
var router = express.Router();

const imagesRouter = require("./api/images");
const productsRouter = require("./api/products");
const usersRouter = require("./api/users");

router.use("/products", productsRouter);
router.use("/images", imagesRouter);
router.use("/users", usersRouter);

module.exports = router;
