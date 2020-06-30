const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const guestMiddleware = require("../middlewares/guestMiddleware");
const { User } = require("../database/models");
const { check, validationResult, body } = require("express-validator");
const storage = multer.diskStorage({
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
const upload = multer({
  storage: storage,
});

async function checkRepeatEmail(email) {
  let emailCheck = await User.findOne({ where: { email: email } });
  if (emailCheck !== null) {
    console.log("User Exists");
    return Promise.reject("El email ya está en uso");
  }
}

// Creando un registro

router.get("/register", guestMiddleware, usersController.showRegister);
router.post(
  "/register",
  upload.any(),
  [
    check("firstName").isLength({
      min: 0,
    }),
    check("lastName").isLength({
      min: 0,
    }),
    check("email").isEmail(),
    check("email")
      .custom(checkRepeatEmail)
      .withMessage("Ya existe una cuenta con ese email"),
    check("password")
      .isLength({
        min: 8,
      })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
  ],
  usersController.register
);

// Log in

router.post("/login", upload.any(), usersController.login);

// Log out
router.get("/logout", usersController.logout);

// Admin

router.get("/admin", usersController.userDetail);

module.exports = router;
