var express = require("express");
var router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);

router.get("/ojos", mainController.ojos);

router.get("/labios", mainController.labios);

router.get("/rostro", mainController.rostro);

router.get("/cejas", mainController.cejas);

router.post("/search", mainController.search);

router.get("/productCart", mainController.cart);

router.get("/addToCart/:id", mainController.addToCart);

router.get("/removeFromCart/:id", mainController.removeFromCart);

module.exports = router;