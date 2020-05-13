var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
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
  res.render("section", { title: "labios", subsections: ["lápiz labial", "delineador", "brillo labial"] });
});

router.get("/rostro", function (req, res, next) {
  res.render("section", { title: "rostro", subsections: ["base en polvo", "base en crema", "iluminador", "concealer"] });
});

router.get("/cejas", function (req, res, next) {
  res.render("section", { title: "cejas", subsections: ["perfilador", "rellenador", "fijador", "cepillos"] });
});

module.exports = router;
