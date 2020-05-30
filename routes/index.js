var express = require("express");
var router = express.Router();
const mainController = require("../controllers/mainController");
/* GET home page. */
router.get("/", mainController.index);

router.get("/cart", mainController.cart);

router.get("/ojos", mainController.ojos);

router.get("/labios", mainController.labios);

router.get("/rostro", mainController.rostro);

router.get("/cejas", mainController.cejas);

module.exports = router;
