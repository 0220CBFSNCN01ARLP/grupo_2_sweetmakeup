var express = require("express");
var router = express.Router();
var path = require("path");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const guestMiddleware = require("../middlewares/guestMiddleware");

let { check, validationResult, body } = require("express-validator");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/users");
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

// Creando un registro

<<<<<<< HEAD
router.get("/register", guestMiddleware, usersController.showRegister);
router.post("/register", upload.any(), usersController.register);
=======
router.get("/register", usersController.showRegister);
router.post(
  "/register",
  upload.any(),
  [
    check("name").isLength({ min: 0 }),
    check("lastName").isLength({ min: 0 }),
    check("email").isEmail(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Colocar al menos 8 caracteres"),
  ],
  usersController.register
);
>>>>>>> 8837b30bbd6a64dca820b8b5a1cc89d4bb58c962

// Log in

router.post("/login", upload.any(), usersController.login);

module.exports = router;