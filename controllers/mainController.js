const fs = require("fs");
const path = require("path");
const { getProducts, productsFilePath } = require("../utils/products");
const { Product, Category, Image } = require("../database/models");

let controller = {
  index: async function (req, res) {
    ojos = await Product.findAll({
      include: [
        { association: "category", where: { name: "rostro" } },
        "images",
      ],
      limit: 4,
    });
    labios = await Product.findAll({
      include: [
        { association: "category", where: { name: "labios" } },
        "images",
      ],
      limit: 4,
    });
    cejas = await Product.findAll({
      include: [
        { association: "category", where: { name: "cejas" } },
        "images",
      ],
      limit: 4,
    });
    rostro = await Product.findAll({
      include: [
        { association: "category", where: { name: "rostro" } },
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

  cart: function (req, res, next) {
    res.render("productCart", {
      user: req.session.user,
    });
  },

  ojos: async function (req, res, next) {
    let productsOjos = await Product.findAll({
      include: [{ association: "category", where: { name: "ojos" } }, "images"],
    });
    res.render("section", {
      title: "ojos",
      subsections: ["mascara", "delineador", "sombra"],
      products: productsOjos,
      user: req.session.user,
    });
  },

  rostro: async function (req, res, next) {
    let productsRostro = await Product.findAll({
      include: [
        { association: "category", where: { name: "rostro" } },
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

  cejas: async function (req, res, next) {
    let productsCejas = await Product.findAll({
      include: [
        { association: "category", where: { name: "cejas" } },
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

  labios: async function (req, res, next) {
    let productsLabios = await Product.findAll({
      include: [
        { association: "category", where: { name: "labios" } },
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
};

module.exports = controller;
