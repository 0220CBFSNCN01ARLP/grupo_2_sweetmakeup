const fs = require("fs");
const path = require("path");
const {
    getProducts,
    productsFilePath
} = require("../utils/products");
const { Product, Category } = require("../database/models")

let controller = {
    index: (req, res) => {
        const ojos = [];
        const labios = [];
        const cejas = [];
        const rostro = [];
        const products = getProducts();

        function shuffleArray(products) {
            for (var i = products.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
        shuffleArray(products);

        products.forEach((element) => {
            if (element.thematic == "ojos") {
                ojos.push(element);
            }
            if (element.thematic == "labios") {
                labios.push(element);
            }
            if (element.thematic == "cejas") {
                cejas.push(element);
            }
            if (element.thematic == "rostro") {
                rostro.push(element);
            }
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
        res.render("productCart", {
            user: req.session.user
        })
    },

    ojos: async function(req, res, next) {
        let productsOjos = await Product.findAll( { include: {association: "category", where: {name: "ojos"}}})
        res.render("section", {
            title: "ojos",
            subsections: ["mascara", "delineador", "sombra"],
            products: productsOjos,
            user: req.session.user
        });
    },

    rostro: async function(req, res, next) {
        let productsRostro = await Product.findAll( { include: {association: "category", where: {name: "rostro"}}})
        
        res.render("section", {
            title: "rostro",
            subsections: [
                "base en polvo",
                "base en crema",
                "iluminador",
                "concealer",
            ],
            products: productsRostro,
            user: req.session.user
        });
    },

    cejas: async function(req, res, next) {
        let productsCejas = await Product.findAll( { include: {association: "category", where: {name: "cejas"}}})
        
        res.render("section", {
            title: "cejas",
            subsections: ["perfilador", "rellenador", "fijador", "cepillos"],
            products: productsCejas,
            user: req.session.user
        });
    },

    labios: async function(req, res, next) {
        let productsLabios = await Product.findAll( { include: {association: "category", where: {name: "labios"}}})
        
        res.render("section", {
            title: "labios",
            subsections: ["lápiz labial", "delineador", "brillo labial"],
            products: productsLabios,
            user: req.session.user
        });
    },
};

module.exports = controller;