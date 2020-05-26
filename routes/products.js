var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController")

router.get("/:id?", productController.detail);

/*** EDIT ONE PRODUCT ***/

router.get("/edit/:id", productController.edit); /* GET - Form  */
router.put("/edit/:id", productController.update); /* PUT - Update  */

module.exports = router;