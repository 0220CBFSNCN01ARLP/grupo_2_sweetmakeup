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
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

async function checkRepeatEmail(email) {
  let emailCheck = await User.findOne({
    where: {
      email: email,
    },
  });
  if (emailCheck !== null) {
    console.log("User Exists");
    return Promise.reject("El email ya está en uso");
  }
}

router.get("/register", guestMiddleware, usersController.showRegister);

router.post(
  "/register",
  upload.single("avatar"),
  [
    check("firstName").trim().isLength({
      min: 2,
    }).withMessage("El nombre debe tener al menos 2 caracteres"),
    check("lastName").trim().isLength({
      min: 2,
    }).withMessage("El apellido debe tener al menos 2 caracteres"),
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

router.post("/login", upload.any(), usersController.login);

router.get("/logout", usersController.logout);

router.get("/admin", usersController.userDetail);

router.get("/myProducts", usersController.myProducts);

router.get("/edit", usersController.userEdit);

router.get("/editpassword", usersController.userEditPassword);

router.put("/edit/:id", upload.any(), usersController.userUpdate);

router.put(
  "/editpassword/:id",
  upload.any(),
  usersController.userUpdatePassword
);

module.exports = router;
