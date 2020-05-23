var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.get("/admin", productController.showLoad);

module.exports = router;
