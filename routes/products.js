var express = require("express");
var router = express.Router();
var path = require("path");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const { check, validationResult, body } = require("express-validator");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
});

// Creando desde cero un producto
router.get("/create", authMiddleware, productController.create);
router.post(
  "/create",
  upload.any(),
  [
    check("productName").isLength({
      min: 4,
    }),
    check("price").isNumeric({
      no_symbols: true,
    }),
    check("discount").isInt({
      min: 1,
      max: 100,
    }),
    check("description").isLength({
      min: 20,
      max: 300,
    }),
    check("ingredients").isLength({
      min: 20,
      max: 300,
    }),
    check("returnPolitic").isLength({
      min: 20,
      max: 300,
    }),
    check("shipping").isLength({
      min: 20,
      max: 300,
    }),
    check("weight").isNumeric({ max: 10000 }),
    check("height").isNumeric({ max: 10000 }),
    check("width").isNumeric({ max: 10000 }),
    check("length").isNumeric({ max: 10000 }),
    check("link").isURL(),
  ],
  productController.store
);

/*** EDIT ONE PRODUCT ***/
router.get(
  "/edit/:id",
  authMiddleware,
  productController.edit
); /* GET - Form to create */
router.put(
  "/edit/:id",
  upload.any(),
  [],
  productController.update
); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", authMiddleware, productController.destroy);

router.get("/:id", productController.detail);

module.exports = router;
