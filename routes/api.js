var express = require("express");
var router = express.Router();

const imagesRouter = require("./api/images");
const productsRouter = require("./api/products");
const usersRouter = require("./api/users");
const categoriesRouter = require("./api/categories");

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/images", imagesRouter);
router.use("/users", usersRouter);

module.exports = router;
