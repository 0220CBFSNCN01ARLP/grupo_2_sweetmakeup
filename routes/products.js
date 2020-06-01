var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware")
// Creando desde cero un producto
router.get("/create", authMiddleware, productController.create);
router.post("/create", productController.store);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", authMiddleware, productController.edit); /* GET - Form to create */
router.put("/edit/:id", productController.update); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", authMiddleware, productController.destroy);

router.get("/:id", productController.detail);

module.exports = router;
