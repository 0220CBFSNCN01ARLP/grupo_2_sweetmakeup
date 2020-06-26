const multer = require("multer");

// CRUD:
// CREATE UPDATE: Fer
// READ: Agus
// DELETE: Gena

const { getProducts, productsFilePath } = require("../utils/products");
const { Product } = require("../database/models");

let controller = {
  // FER
  create: function (req, res, next) {
    res.render("productAdd", {
      user: req.session.user,
    });
  },

  // FER

  store: function (req, res, next) {
    const products = getProducts();
    //buscar el ID máximo entre los productos existentes, y setear el nuevo como maxId + 1 para asegurar que no se repitan
    const maxId = Math.max(...products.map((o) => o.id), 0);
    let newId = maxId + 1;
    let newProduct = {
      id: newId,
      ...req.body,
      avatar: req.files[0].filename,
    };
    console.log(newProduct);
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
    res.redirect("/");
  },

  // FER
  edit: (req, res) => {
    //GET -> muestra el formulario

    const products = getProducts();
    const product = products.find((e) => {
      return e.id == req.params.id;
    });

    if (product == null) return res.redirect("/");

    res.render("productEdit", {
      product,
      user: req.session.user,
    });
  },

  //FER

  //PUT /products/edit/12385
  update: (req, res, next) => {
    //PUT -> procesar el formulario y redireccionar(o renderizar)
    const products = getProducts();
    let product = products.find((e) => {
      return e.id == req.params.id;
    });

    if (product == null) return res.redirect("/");

    //MODIFICAR EL PRODUCTO EN BASE A LO QUE VIENE DEL FORM y VERIFICAR SI LOS DATOS SON VALIDOS

    req.body.price = Number.parseFloat(req.body.price);
    req.body.discount = Number.parseFloat(req.body.discount);

    //ACTUALIZAR LOS DATOS DEL PRODUCTO
    product = {
      ...product,
      ...req.body,
    };

    //GUARDAR EL PRODUCTO EN LA DB
    const index = products.findIndex((product, index) => {
      return product.id == req.params.id;
    });
    products.splice(index, 1, product);

    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    res.redirect("/products/" + product.id);
  },

  //GENARO

  destroy: (req, res) => {
    const products = getProducts();
    const index = products.findIndex((e) => {
      return e.id == req.params.id;
    });

    if (index == -1) return res.redirect("/");

    products.splice(index, 1);

    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    res.redirect("/");
  },

  //AGUS
  detail: async function (req, res, next) {
    let product = await Product.findByPk(req.params.id)
    console.log(product);
    res.send ("uwu");

    //res.render("productDetail", {
      //product,
      //related,
      //user: req.session.user,
    //});
  },
};

module.exports = controller;
