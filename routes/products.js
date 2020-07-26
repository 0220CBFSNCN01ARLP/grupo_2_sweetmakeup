var express = require("express");
var router = express.Router();
var path = require("path");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const productEditMiddleware = require("../middlewares/productEditMiddleware");

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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

// Creando desde cero un producto
router.get("/create", authMiddleware, productController.create);
router.post(
  "/create",
  upload.any(),
  [
    check("productName")
      .isLength({
        min: 4,
      })
      .withMessage("Nombre del Producto: Debe tener al menos 4 caracteres"),
    check("price").isNumeric().withMessage("Precio: Colocar un numero valido"),
    check("discount")
      .isInt({
        min: 0,
        max: 100,
      })
      .withMessage("Oferta: Coloque un numero entero del 1 al 100 sin comas"),
    check("description")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Descripcion: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("ingredients")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Ingredientes: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("returnPolitic")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Politicas de Devolucion: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("shipping")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Informacion de Envio: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("weight").isNumeric({
      max: 10000,
    }),
    check("height").isNumeric({
      max: 10000,
    }),
    check("width").isNumeric({
      max: 10000,
    }),
    check("length").isNumeric({
      max: 10000,
    }),
  ],
  productController.store
);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productEditMiddleware, productController.edit);

/* GET - Form to create */
router.put(
  "/edit/:id",
  upload.any(),
  [
    check("productName")
      .isLength({
        min: 4,
      })
      .withMessage("Nombre del Producto: Debe tener al menos 4 caracteres"),
    check("price").isNumeric().withMessage("Precio: Colocar un numero valido"),
    check("discount")
      .isInt({
        min: 0,
        max: 100,
      })
      .withMessage("Oferta: Coloque un numero entero del 1 al 100 sin comas"),
    check("description")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Descripcion: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("ingredients")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Ingredientes: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("returnPolitic")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Politicas de Devolucion: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("shipping")
      .isLength({
        min: 20,
        max: 300,
      })
      .withMessage(
        "Informacion de Envio: Minimo: 20 caracteres, Maximo: 300 caracteres"
      ),
    check("weight").isNumeric({
      max: 10000,
    }),
    check("height").isNumeric({
      max: 10000,
    }),
    check("width").isNumeric({
      max: 10000,
    }),
    check("length").isNumeric({
      max: 10000,
    }),
  ],
  productController.update
); /* PUT - Update in DB */

// Borrando un producto
router.delete("/delete/:id", authMiddleware, productController.destroy);
router.get("/:id", productController.detail);

module.exports = router;
