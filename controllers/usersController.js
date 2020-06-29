const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
var express = require("express");

const { getUsers, usersFilePath } = require("../utils/users");
const { User } = require("../database/models");

let { check, validationResult, body } = require("express-validator");

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
      });
      res.redirect("/");
    } else {
      return res.render("register", {
        errors: errors.errors,
      });
    }
  },

  login: async (req, res, next) => {
    let user = await User.findOne({ where: { email: req.body.loginEmail } });

    let correctPw = await bcrypt.compare(req.body.loginPassword, user.password);
    if (!correctPw){
        user = null;
        console.log("Contraseña incorrecta")
    };

    if (user == null) return res.redirect("register");

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

  userDetail: (req, res) => {
    res.render("userDetail");
  },
};

module.exports = usersController;
