var express = require("express");
var router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/:id", tagsController.tagDetail);

module.exports = router;
