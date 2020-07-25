var express = require("express");
var router = express.Router();

const apiProductController = require("../../controllers/api/productController");

router.get("/", apiProductController.products);
router.get("/:id", apiProductController.detail);

module.exports = router;