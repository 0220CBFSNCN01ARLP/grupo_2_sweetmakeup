const fs = require("fs");
const path = require("path");
const {
    getProducts,
    productsFilePath
} = require("../utils/products");
const {
    Product,
    Category,
    Image
} = require("../database/models");
const {
    promiseImpl
} = require("ejs");

let controller = {
    index: async function(req, res) {
        ojos = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "rostro"
                    }
                },
                "images",
            ],
            limit: 4,
        });
        labios = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "labios"
                    }
                },
                "images",
            ],
            limit: 4,
        });
        cejas = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "cejas"
                    }
                },
                "images",
            ],
            limit: 4,
        });
        rostro = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "rostro"
                    }
                },
                "images",
            ],
            limit: 4,
        });
        res.render("index", {
            ojos,
            labios,
            cejas,
            rostro,
            user: req.session.user
        });
    },


    cart: function(req, res, next) {
        let subtotal = 0;
        let discount = 0;
        let discountDecimal = 0;
        let totalDecimal = 0;
        let total = 0;
        if (req.session.product == null || req.session.product == undefined) {

        } else {

            for (prod of req.session.product) {
                subtotal += Number(prod.price),
                    discount += Number(prod.discount)

            }
            subtotal = subtotal.toFixed(2);
            discountReal = discount * subtotal / 100;
            discountDecimal = discountReal.toFixed(2);
            total = subtotal - discountDecimal;
            totalDecimal = total.toFixed(2);
        }

        res.render("productCart", {
            user: req.session.user,
            product: req.session.product,
            discountDecimal,
            totalDecimal,
            subtotal
        });
    },

    ojos: async function(req, res, next) {
        let productsOjos = await Product.findAll({
            include: [{
                association: "category",
                where: {
                    name: "ojos"
                }
            }, "images"],
        });
        res.render("section", {
            title: "ojos",
            subsections: ["mascara", "delineador", "sombra"],
            products: productsOjos,
            user: req.session.user,
        });
    },

    rostro: async function(req, res, next) {
        let productsRostro = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "rostro"
                    }
                },
                "images",
            ],
        });

        res.render("section", {
            title: "rostro",
            subsections: [
                "base en polvo",
                "base en crema",
                "iluminador",
                "concealer",
            ],
            products: productsRostro,
            user: req.session.user,
        });
    },

    cejas: async function(req, res, next) {
        let productsCejas = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "cejas"
                    }
                },
                "images",
            ],
        });

        res.render("section", {
            title: "cejas",
            subsections: ["perfilador", "rellenador", "fijador", "cepillos"],
            products: productsCejas,
            user: req.session.user,
        });
    },

    labios: async function(req, res, next) {
        let productsLabios = await Product.findAll({
            include: [{
                    association: "category",
                    where: {
                        name: "labios"
                    }
                },
                "images",
            ],
        });

        res.render("section", {
            title: "labios",
            subsections: ["lápiz labial", "delineador", "brillo labial"],
            products: productsLabios,
            user: req.session.user,
        });
    },


    search: async function(req, res, next) {

        let productSearch = await Product.findAll({

            include: ["category", "images"],

            where: {
                // name: new RegExp(req.body.buscador, "i")
                // name: /^req.body.buscador/
                name: req.body.search,
            },

        });
        console.log(productSearch);
        res.render("section", {
            title: "labios",
            subsections: ["lápiz labial", "delineador", "brillo labial"],
            products: productSearch,
            user: req.session.user
        });
    },
    addToCart: async function(req, res, next) {
        let product = await Product.findOne({
            include: ["category", "images", "user"],
            where: {
                id: req.body.id,
            },
        });
        if (req.session.product == null || req.session.product == undefined) {
            req.session.product = [];
        }
        req.session.product.push(product);

    },

    buyCart: async function(req, res, next) {
        let product = await Product.findOne({
            include: ["category", "images", "user"],
            where: {
                id: req.body.id,
            },
        });
        if (req.session.product == null || req.session.product == undefined) {
            req.session.product = [];
        }
        req.session.product.push(product);
        res.redirect("/buyCart+")


        
    }
};

module.exports = controller;