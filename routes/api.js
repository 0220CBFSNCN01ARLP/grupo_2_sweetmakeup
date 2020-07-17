var express = require("express");
var router = express.Router();
const apiProductController = require("../controllers/api/productController");
const apiImageController = require("../controllers/api/imageController")

router.get("/products", apiProductController.products);
router.get("/products/:id", apiProductController.detail);

router.get("/images/:id", apiImageController.getOne)

module.exports = router;
