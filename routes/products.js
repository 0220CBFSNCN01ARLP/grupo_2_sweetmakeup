var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

<<<<<<< HEAD
router.get("/:id", productController.detail);

=======
>>>>>>> bed583150ae565d2ba55403cfaed5fe978d7b178
// Creando desde cero un producto
router.get("/create", productController.create);
router.post("/create", productController.store);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productController.edit); /* GET - Form to create */
router.put("/edit/:id", productController.update); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", productController.destroy);

router.get("/:id", productController.detail);



module.exports = router;