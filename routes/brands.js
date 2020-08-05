var express = require("express");
var router = express.Router();
const brandsController = require("../controllers/brandsController");

router.get("/", brandsController.brand);
router.get("/:id", brandsController.brandDetail);

module.exports = router;
