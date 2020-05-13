var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/cart", function (req, res, next) {
  res.render("productCart");
});

router.get("/ojos", function (req, res, next) {
  res.render("section", { title: "ojos", subsections: ["sombra", "delineador", "corrector de ojeras", "mascara"] });
});

router.get("/labios", function (req, res, next) {
  res.render("section", { title: "labios", subsections: ["lápiz labial", "delineador", "lorem", "ipsum"] });
});

router.get("/cara", function (req, res, next) {
  res.render("section", { title: "cara", subsections: ["base", "rubor", "lorem", "mascara"] });
});

router.get("/cejas", function (req, res, next) {
  res.render("section", { title: "cejas", subsections: ["lorem", "ipsum", "corrector de ojeras", "mascara"] });
});

module.exports = router;
