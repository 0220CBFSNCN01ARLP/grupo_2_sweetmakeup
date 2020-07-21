const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
var express = require("express");

//const { getUsers, usersFilePath } = require("../utils/users");
const { User, Product, Image } = require("../database/models");

let { check, validationResult, body } = require("express-validator");
const session = require("express-session");

let usersController = {
  showRegister: (req, res) => {
    res.render("register");
  },

  register: async (req, res, next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      await User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.files[0].filename,
      });

      res.redirect("/");
    } else {
      return res.render("register", {
        errors: errors.errors,
      });
    }
  },

  login: async (req, res, next) => {
    let user = await User.findOne({
      where: {
        email: req.body.loginEmail,
      },
    });
<<<<<<< HEAD

=======
    if (!user) {
        return res.redirect("register");
      }
>>>>>>> 78df1ade10dbe94ccf3b5075d71cb714cb2eadbd
    let correctPw = await bcrypt.compare(req.body.loginPassword, user.password);
    if (!correctPw) {
      user = null;
      console.log("Contraseña incorrecta");
<<<<<<< HEAD
    }

    if (user == null) return res.redirect("register");

=======
      return res.redirect("register");
    }

>>>>>>> 78df1ade10dbe94ccf3b5075d71cb714cb2eadbd
    // Se guarda la cookie por 30 minutos, el usuario puede cerrar el navegador y volver al poco tiempo
    let cookieAge = 1800000;
    // Si selecciona recordar, la cookie dura un mes
    if (req.body.remember != undefined) {
      cookieAge = 2630000000;
    }
    req.session.user = user;
    res.cookie("user", user.email, {
      maxAge: cookieAge,
    });
    res.redirect("/");
  },

  logout: (req, res, next) => {
    if (req.session.user != null) {
      req.session.destroy(function (err) {
        res.clearCookie("user");
        res.redirect("/");
      });
    } else {
      res.redirect("register");
    }
  },

  userDetail: async (req, res) => {
    res.render("userDetail", {
      user: req.session.user,
    });
  },
  userEdit: async (req, res, next) => {
    res.render("userEdit", {
      user: req.session.user,
    });
  },
  userEditPassword: async (req, res, next) => {
    res.render("userEditPassword", {
      user: req.session.user,
    });
  },

  userUpdate: async (req, res, next) => {
    console.log(req.files);
    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
<<<<<<< HEAD
        avatar: req.file.filename,

=======
        avatar: req.files[0].filename,
>>>>>>> 78df1ade10dbe94ccf3b5075d71cb714cb2eadbd
        //  password: bcrypt.hashSync(req.body.password, 10),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

<<<<<<< HEAD
    console.log(avatar);

=======
>>>>>>> 78df1ade10dbe94ccf3b5075d71cb714cb2eadbd
    req.session.user.firstName = req.body.firstName;
    req.session.user.lastName = req.body.lastName;
    req.session.user.email = req.body.email;
    // req.session.user.password = req.body.password;
    res.redirect("/users/admin");
  },

  userUpdatePassword: async (req, res, next) => {
    await User.update(
      {
        password: bcrypt.hashSync(req.body.password, 10),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    req.session.user.password = req.body.password;
    res.redirect("/users/admin");
  },
  myProducts: async (req, res, next) => {
    let user = req.session.user;
    if (!user) {
      res.redirect("/users/register");
    }
    let products = await Product.findAll({
      where: {
        userId: user.id,
      },
      include: "images",
    });
    res.render("myProducts", {
      products,
      user,
    });
  },
};

module.exports = usersController;
