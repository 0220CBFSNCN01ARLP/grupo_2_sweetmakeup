const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
var express = require("express");

//const { getUsers, usersFilePath } = require("../utils/users");
const {
    User,
    Product,
    Image
} = require("../database/models");

let {
    check,
    validationResult,
    body
} = require("express-validator");
const session = require("express-session");
const {
    log
} = require("console");

let usersController = {
    showRegister: (req, res) => {
        res.render("register");
    },

    register: async(req, res, next) => {
        try {
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
        } catch (e) {
            console.log("Error al escribir en la base de datos " + e)
        }
    },

    login: async(req, res, next) => {
        try {

            let user = await User.findOne({
                where: {
                    email: req.body.loginEmail,
                },
            });

            if (!user) {
                return res.render("register", {
                    mensaje: "Usuario incorrecto"
                });
            }


            let correctPw = await bcrypt.compare(req.body.loginPassword, user.password);
            if (!correctPw) {
                user = null;
                console.log("Contraseña incorrecta");


                return res.render("register", {
                    mensaje2: "Contraseña incorrecta"
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
            console.log("Error al iniciar sesión " + e)
        }
    },

    logout: (req, res, next) => {
        if (req.session.user != null) {
            req.session.destroy(function(err) {
                res.clearCookie("user");
                res.redirect("/");
            });
        } else {
            res.redirect("register");
        }
    },

    userDetail: async(req, res) => {
        try {
            res.render("userDetail", {
                user: req.session.user,
            });
        } catch (e) {
            console.log("Error al recuperar datos de la base de datos " + e)
        }
    },
    userEdit: (req, res, next) => {
        res.render("userEdit", {
            user: req.session.user,
        });
    },
    userEditPassword: (req, res, next) => {
        res.render("userEditPassword", {
            user: req.session.user,
        });
    },

    userUpdate: async(req, res, next) => {
        try {
            console.log(req.files);
            await User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                avatar: req.files[0].filename,
                //  password: bcrypt.hashSync(req.body.password, 10),
            }, {
                where: {
                    id: req.params.id,
                },
            });

            req.session.user.firstName = req.body.firstName;
            req.session.user.lastName = req.body.lastName;
            req.session.user.email = req.body.email;
            // req.session.user.password = req.body.password;
            res.redirect("/users/admin");
        } catch (e) {
            console.log("Error al actualizar la base de datos " + e)
        }
    },

    userUpdatePassword: async(req, res, next) => {
        try {
            await User.update({
                password: bcrypt.hashSync(req.body.password, 10),
            }, {
                where: {
                    id: req.params.id,
                },
            });
            req.session.user.password = req.body.password;
            res.redirect("/users/admin");
        } catch (e) {
            console.log("Error al actualizar la base de datos " + e)
        }
    },
    myProducts: async(req, res, next) => {
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
            res.render("myProducts", {
                products,
                user,
            });
        } catch (e) {
            console.log("Error al recuperar datos de la base de datos " + e)
        }

    },
};

module.exports = usersController;