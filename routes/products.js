var express = require("express");
var router = express.Router();

router.get("/detail/:id?", function (req, res, next) {
  res.render("producto");
});

router.get("/add", function (req, res, next) {
  res.render("productAdd");
});

router.get("/add2", function (req, res, next) {
  res.render("loadedProducts");
});

module.exports = router;
