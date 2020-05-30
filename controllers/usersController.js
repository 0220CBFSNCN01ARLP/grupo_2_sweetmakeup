const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");

let usersController = {
  showRegister: (req, res) => {
    res.render("register");
  },

  register: (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const read = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
    );

    let user = {
      ...req.body,
    };

    const users = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
    );

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
