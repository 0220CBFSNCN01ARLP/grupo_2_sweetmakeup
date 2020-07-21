var express = require("express");
var router = express.Router();
const apiUserController = require("../../controllers/api/usersController");

router.get("/:id", apiUserController.getOne);

module.exports = router;