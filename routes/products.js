var express = require("express");
var router = express.Router();
var path = require("path");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const { check, validationResult, body } = require("express-validator");

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
    check("productName").isLength({
      min: 4,
    }),
    check("productName").isLength({
      min: 4,
    }),
    check("productName").isLength({
      min: 4,
    }),
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
<<<<<<< HEAD
    "/edit/:id",
    upload.any(),
    productController.update
=======
  "/edit/:id",
  upload.any(),
  [],
  productController.update
>>>>>>> 0d3c9e571b36c8041f95a37e15d6dd8b59a43e82
); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", authMiddleware, productController.destroy);

router.get("/:id", productController.detail);

module.exports = router;