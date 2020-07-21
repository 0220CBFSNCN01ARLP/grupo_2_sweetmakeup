var express = require("express");
var router = express.Router();
const apiImageController = require("../../controllers/api/imageController");

router.get("/:id", apiImageController.getOne)

module.exports = router;