var express = require("express");
var router = express.Router();
const apiCategoryController = require("../../controllers/api/categoryController");

router.get("/", apiCategoryController.getAll);

module.exports = router;
