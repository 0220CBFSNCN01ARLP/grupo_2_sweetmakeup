var express = require("express");
var router = express.Router();
const multer = require("multer");
var path = require("path");
const mainController = require("../controllers/mainController");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/img/products");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/png"].includes(file.mimetype)) {
            return cb(null, true);
        }
        return cb(null, false);
    },
});

/* GET home page. */
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