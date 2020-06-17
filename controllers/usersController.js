const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
var express = require("express");

const {
    getUsers,
    usersFilePath
} = require("../utils/users");

let {
    check,
    validationResult,
    body
} = require("express-validator");

let usersController = {
    showRegister: (req, res) => {
        res.render("register");
    },

    register: (req, res, next) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
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
                avatar: req.files[0].filename,
            };

            users.push(user);

            fs.writeFileSync(
                path.resolve(__dirname, "../data/users.json"),
                JSON.stringify(users)
            );

            res.redirect("/");
        } else {
            return res.render("register", {
                errors: errors.errors,
            });
        }
    },

    login: (req, res, next) => {
        const users = getUsers();
        const user = users.find((e) => {
            return (
                bcrypt.compareSync(req.body.loginPassword, e.password) &&
                e.email == req.body.loginEmail
            );
        });
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
            req.session.destroy(function(err) {
                res.clearCookie("user");
                res.redirect("/");
            });
        } else {
            res.redirect("register");
        }
    },
};

module.exports = usersController;