const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");

const { getUsers, usersFilePath } = require("../utils/users");

let usersController = {
  showRegister: (req, res) => {
    res.render("register");
  },

  register: (req, res, next) => {
    const users = getUsers();
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const read = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
    );

    const maxId = Math.max(...users.map((o) => o.id), 0);
    let newId = maxId + 1;

    let user = {
      id: newId,
      ...req.body,
    };

    users.push(user);

    fs.writeFileSync(
      path.resolve(__dirname, "../data/users.json"),
      JSON.stringify(users)
    );

    res.redirect("/");
  },

  login: (req, res) => {},
};

module.exports = usersController;
