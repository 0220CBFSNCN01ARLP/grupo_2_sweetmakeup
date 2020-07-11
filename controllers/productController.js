const multer = require("multer");

// CRUD:
// CREATE UPDATE: Fer
// READ: Agus
// DELETE: Gena

const { getProducts, productsFilePath } = require("../utils/products");
const {
  Product,
  Category,
  Brand,
  Color,
  Image,
  User,
} = require("../database/models");
const { promiseImpl } = require("ejs");
const products = require("../utils/products");
const color = require("../database/models/color");
const product = require("../database/models/product");

let controller = {
  // FER
  create: async function (req, res, next) {
    const categories = await Category.findAll();
    const brands = await Brand.findAll();
    res.render("productAdd", {
      categories,
      brands,
      user: req.session.user,
    });
  },

  // FER
  store: async function (req, res, next) {
    console.log("fer");
    console.log(req.body.thematic);
    const newProduct = await Product.create({
      name: req.body.productName,
      price: req.body.price,
      brandId: req.body.brand,
      categoryId: req.body.thematic,
      discount: req.body.discount,
      description: req.body.description,
      ingredients: req.body.ingredients,
      shipping: req.body.shipping,
      returnPolitic: req.body.returnPolitic,
      link: req.body.link,
      weight: req.body.weight,
      height: req.body.height,
      width: req.body.width,
      length: req.body.length,
      userId: req.session.user.id,
    });
    let newImage = await Image.create({
      productId: newProduct.id,
      size: req.files[0].size,
      fileType: req.files[0].mimetype,
      route: req.files[0].filename,
    });
    console.log(newProduct);
    res.redirect(`/products/${newProduct.id}`);
  },

  // FER
  edit: async function (req, res, next) {
    //GET -> muestra el formulario
    let pedidoProduct = await Product.findByPk(req.params.id);
    if (pedidoProduct == null) return res.redirect("/");

    let pedidoCategories = await Category.findAll();

    let pedidoBrands = await Brand.findAll();

    let color = "#FFFFFF";
    let descuento = true;

    res.render("productEdit", {
      product: pedidoProduct,
      categories: pedidoCategories,
      brands: pedidoBrands,
      user: req.session.user,
      color,
      descuento,
    });
  },

  //FER
  //PUT /products/edit/12385
  update: async (req, res, next) => {
    await Product.update(
      {
        name: req.body.productName,
        price: req.body.price,
        brandId: req.body.brand,
        categoryId: req.body.thematic,
        discount: req.body.discount,
        description: req.body.description,
        shipping: req.body.shipping,
        link: req.body.link,
        ingredients: req.body.ingredients,
        returnPolitic: req.body.returnPolitic,
        weight: req.body.weight,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length,
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );
    let newImage = await Image.create({
      productId: newProduct.id,
      size: req.files[0].size,
      fileType: req.files[0].mimetype,
      route: req.files[0].filename,
    });

    res.redirect("/products/" + req.params.id);
  },

  //GENARO

  destroy: async (req, res) => {
    // ASI LO HACE PABLO
    // const product = await Product.findByPk(req.params.id);
    // await product.destroy();

    // MAS EFICIENTE PORQUE HACE SOLO UNA CONSULTA
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/");
  },

  //AGUS

  detail: async function (req, res, next) {
    let product = await Product.findByPk(req.params.id, {
      include: ["category", "images"],
    });
    let related = await Product.findAll({
      include: {
        association: "category",
        where: {
          name: product.category.name,
        },
      },
      limit: 4,
    });

    res.render("productDetail", {
      product,
      related,
      user: req.session.user,
    });
  },
};

module.exports = controller;
