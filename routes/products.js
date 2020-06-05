var express = require("express");
var router = express.Router();
var path = require("path");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/productos");
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
router.post("/create", upload.any(), productController.store);

/*** EDIT ONE PRODUCT ***/
router.get(
  "/edit/:id",
  authMiddleware,
  productController.edit
); /* GET - Form to create */
router.put(
  "/edit/:id",
  upload.any(),
  productController.update
); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", authMiddleware, productController.destroy);

router.get("/:id", productController.detail);

module.exports = router;
