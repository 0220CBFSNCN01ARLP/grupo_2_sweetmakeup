var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upLoads/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

// Creando un registro
router.get("/register", usersController.showRegister);
router.post("/register", upload.any(), usersController.register);

// Log in
router.post("/register", usersController.login);

module.exports = router;
