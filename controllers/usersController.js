const bcrypt = require("bcrypt");
const multer = require("multer");
var express = require("express");
const { User, Product, Brand, Image } = require("../database/models");

let { check, validationResult, body } = require("express-validator");
const session = require("express-session");

let controller = {
  showRegister: async (req, res) => {
    let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("register", { brandsHeader });
  },

  register: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let newUser = await User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatar: req.files[0].filename,
          roleId: req.body.role,
        });
        req.session.user = newUser;
        res.cookie("user", newUser.email, {
          maxAge: 15*60*1000,
        });
        res.redirect("/");
      } else {
        return res.render("register", {
          errors: errors.errors,
        });
      }
    } catch (e) {
      console.log("Error al escribir en la base de datos " + e);
    }
  },

  login: async (req, res, next) => {
    try {
      let user = await User.findOne({
        where: {
          email: req.body.loginEmail,
        },
      });

      if (!user) {
        let brandsHeader = await Brand.findAll({ limit: 10 });

        return res.render("register", {
          brandsHeader,
          mensaje: "Usuario incorrecto",
        });
      }

      let correctPw = await bcrypt.compare(
        req.body.loginPassword,
        user.password
      );
      if (!correctPw) {
        let brandsHeader = await Brand.findAll({ limit: 10 });

        user = null;
        console.log("Contraseña incorrecta");

        return res.render("register", {
          brandsHeader,
          mensaje2: "Contraseña incorrecta",
        });
      }
      let cookieAge = 1800000;
      if (req.body.remember != undefined) {
        cookieAge = 1000 * 3600 * 24 * 30;
      }
      req.session.user = user;
      res.cookie("user", user.email, {
        maxAge: cookieAge,
      });
      res.redirect("/");
    } catch (e) {
      console.log("Error al iniciar sesión " + e);
    }
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
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });
      res.render("userDetail", {
        brandsHeader,
        user: req.session.user,
      });
    } catch (e) {
      console.log("Error al recuperar datos de la base de datos " + e);
    }
  },
  userEdit: async (req, res, next) => {
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });
    res.render("userEdit", {
      brandsHeader,
      user: req.session.user,
    });
    } catch (error) {
      console.error(error)
    }
    
  },
  userEditPassword: async (req, res, next) => {
    try {
      let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("userEditPassword", {
      brandsHeader,
      user: req.session.user,
    });
    } catch (error) {
      console.error(error)
    }
  },

  userUpdate: async (req, res, next) => {
    try {
      console.log(req.files);
      await User.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          // avatar: req.files[0].filename,
          //  password: bcrypt.hashSync(req.body.password, 10),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      req.session.user.firstName = req.body.firstName;
      req.session.user.lastName = req.body.lastName;
      req.session.user.email = req.body.email;
      res.redirect("/users/admin");
    } catch (e) {
      console.error(error)
    }
  },

  userUpdatePassword: async (req, res, next) => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  },
  myProducts: async (req, res, next) => {
    try {
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
      let brandsHeader = await Brand.findAll({ limit: 10 });

      res.render("myProducts", {
        products,
        brandsHeader,
        user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;
