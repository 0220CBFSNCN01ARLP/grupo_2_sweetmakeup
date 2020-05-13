var express = require("express");
var router = express.Router();

router.get("/load", function (req, res, next) {
  res.render("loadProduct");
});

module.exports = router;
