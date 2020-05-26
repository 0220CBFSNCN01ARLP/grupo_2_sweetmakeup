var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

//router.get("/:id", productController.detail);

// Creando desde cero un producto
router.get("/create", productController.create);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productController.edit); /* GET - Form to create */
router.put("/edit/:id", productController.update); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", productController.destroy);

module.exports = router;
