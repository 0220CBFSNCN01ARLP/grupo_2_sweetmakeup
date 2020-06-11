const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const guestMiddleware = require("../middlewares/guestMiddleware");

const {
    check,
    validationResult,
    body
} = require("express-validator");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/img/users");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
});
const { getUsers, usersFilePath } = require("../utils/users");
function findUserByEmail(email){
    const users = getUsers();
    const user = users.find((e) => {
      return (
        e.email == email
      );
    });
    return (users == null);
};


// Creando un registro

router.get("/register", guestMiddleware, usersController.showRegister);
router.post(
    "/register",
    upload.any(), [
        check("name").isLength({
            min: 0
        }),
        check("lastName").isLength({
            min: 0
        }),
        check("email").isEmail(),
        check("email").custom(findUserByEmail).withMessage("Ya existe una cuenta con ese email"),
        check("password")
        .isLength({
            min: 8
        })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    ],
    usersController.register
);

// Log in

router.post("/login", upload.any(), usersController.login);

// Log out
router.get("/logout", usersController.logout);

module.exports = router;