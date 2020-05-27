const fs = require("fs");
const path = require("path");
const { getProducts, productsFilePath } = require("../utils/products");

let controller = {
    index: function (req, res, next) {
        res.render("index");
      },
    register: function (req, res, next) {
        res.render("register");
      },
    cart: function (req, res, next) {
        res.render("productCart");
      },
    ojos: function (req, res, next) {
        let products = getProducts();
        let productsOjos = products.filter((product)=>{return product.thematic == "ojos"});
        console.log(productsOjos);
        res.render("section", { title: "ojos", subsections: ["mascara", "delineador", "sombra"], products: productsOjos });
      },
    rostro: function (req, res, next) {
        let products = getProducts();
        let productsRostro = products.filter((product)=>{return product.thematic == "rostro"});
        console.log(productsRostro);
        res.render("section", { title: "rostro", subsections: ["base en polvo", "base en crema", "iluminador", "concealer"], products: productsRostro });
      },
    cejas: function (req, res, next) {
      let products = getProducts();
      let productsCejas = products.filter((product)=>{return product.thematic == "cejas"});
      console.log(productsCejas);
        res.render("section", { title: "cejas", subsections: ["perfilador", "rellenador", "fijador", "cepillos"], products: productsCejas });
      },
    labios: function (req, res, next) {
      let products = getProducts();
      let productsLabios = products.filter((product)=>{return product.thematic == "labios"});
      console.log(productsLabios
);
        res.render("section", { title: "labios", subsections: ["lápiz labial", "delineador", "brillo labial"], products: productsLabios });
      }
};

module.exports = controller;