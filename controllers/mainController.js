const fs = require("fs");
const path = require("path");
const { getProducts, productsFilePath } = require("../utils/products");
const {
  Product,
  Category,
  Image,
  Brand,
  Sequelize,
} = require("../database/models");
const Op = Sequelize.Op;
const { promiseImpl } = require("ejs");

let controller = {
  index: async function (req, res) {
    ojos = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "rostro",
          },
        },
        "images",
      ],
      limit: 4,
    });
    labios = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "labios",
          },
        },
        "images",
      ],
      limit: 4,
    });
    cejas = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "cejas",
          },
        },
        "images",
      ],
      limit: 4,
    });
    rostro = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "rostro",
          },
        },
        "images",
      ],
      limit: 4,
    });

    let brands = await Brand.findAll({ limit: 10 });

    res.render("index", {
      ojos,
      labios,
      cejas,
      rostro,
      brands,
      user: req.session.user,
    });
  },

  cart: async function (req, res, next) {
    let subtotal = 0;
    let discount = 0;
    let discountDecimal = 0;
    let totalDecimal = 0;
    let total = 0;
    const realProducts = [];
    if (
      req.session.product == null ||
      req.session.product == "undefined" ||
      req.session.product == undefined
    ) {
    } else {
      for (let sessionProduct of req.session.product) {
        const realProduct = await Product.findByPk(sessionProduct.id, {
          include: ["images"],
        });
        realProducts.push(realProduct);
        subtotal += Number(realProduct.price * sessionProduct.count);
        discount += Number(realProduct.discount);
      }
      subtotal = subtotal.toFixed(2);
      discountReal = (discount * subtotal) / 100;
      discountDecimal = discountReal.toFixed(2);
      total = subtotal - discountDecimal;
      totalDecimal = total.toFixed(2);
    }
    let brands = await Brand.findAll({ limit: 10 });

    res.render("productCart", {
      user: req.session.user,
      product: realProducts,
      discountDecimal,
      totalDecimal,
      subtotal,
      brands,
    });
  },

  ojos: async function (req, res, next) {
    let productsOjos = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "ojos",
          },
        },
        "images",
      ],
    });
    let brands = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "ojos",
      subsections: ["mascara", "delineador", "sombra"],
      products: productsOjos,
      brands,
      user: req.session.user,
    });
  },

  rostro: async function (req, res, next) {
    let productsRostro = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "rostro",
          },
        },
        "images",
      ],
    });
    let brands = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "rostro",
      subsections: [
        "base en polvo",
        "base en crema",
        "iluminador",
        "concealer",
      ],
      products: productsRostro,
      brands,
      user: req.session.user,
    });
  },

  cejas: async function (req, res, next) {
    let productsCejas = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "cejas",
          },
        },
        "images",
      ],
    });
    let brands = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "cejas",
      subsections: ["perfilador", "rellenador", "fijador", "cepillos"],
      products: productsCejas,
      brands,
      user: req.session.user,
    });
  },

  labios: async function (req, res, next) {
    let productsLabios = await Product.findAll({
      include: [
        {
          association: "category",
          where: {
            name: "labios",
          },
        },
        "images",
      ],
    });
    let brands = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "labios",
      subsections: ["lápiz labial", "delineador", "brillo labial"],
      products: productsLabios,
      brands,
      user: req.session.user,
    });
  },

  search: async function (req, res, next) {
    let productSearch = await Product.findAll({
      include: ["category", "images"],

      where: {
        // name: new RegExp(req.body.buscador, "i")
        // name: /^req.body.buscador/
        name: req.body.search,
      },
    });
    console.log(productSearch);
    let brands = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "labios",
      subsections: ["lápiz labial", "delineador", "brillo labial"],
      products: productSearch,
      brands,
      user: req.session.user,
    });
  },
  buyCart: async function (req, res, next) {
    let product = await Product.findOne({
      include: ["category", "images", "user"],
      where: {
        id: req.body.id,
      },
    });
    if (!req.session.product) {
      req.session.product = [];
    }
    const prod = req.session.product.find((e) => {
      return e.id == product.id;
    });
    if (!prod) {
      req.session.product.push({
        id: product.id,
        count: 1,
      });
    } else {
      prod.count++;
    }
    let brands = await Brand.findAll({ limit: 10 });

    res.redirect("/productCart", { brands });
  },
};

module.exports = controller;
