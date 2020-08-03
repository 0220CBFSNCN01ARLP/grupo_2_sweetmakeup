const multer = require("multer");
const { Op } = require("sequelize");
const { check, validationResult, body } = require("express-validator");

const {
  Product,
  Category,
  Brand,
  Color,
  Image,
  User,
  Tag,
  Product_Tag,
} = require("../database/models");
const { promiseImpl } = require("ejs");
const product_tag = require("../database/models/product_tag");

let controller = {
  // FER
  create: async function (req, res, next) {
    try {
      let categories = await Category.findAll();
      let tags = await Tag.findAll();
      let brands = await Brand.findAll();
      res.render("productAdd", {
        categories,
        tags,
        brands,
        user: req.session.user,
      });
    } catch (e) {
      console.log("Error al obtener información de la base de datos" + e);
    }
  },

  // FER
  store: async function (req, res, next) {
    try {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
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

        if (req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            const newImage = await Image.create({
              productId: newProduct.id,
              size: req.files[i].size,
              fileType: req.files[i].mimetype,
              route: req.files[i].filename,
            });
          }
        }
        //const newRelationshipProductTag = await Product_Tag.create({
        //  productId: newProduct.id,
        //  tagId: req.body.etiqueta,
        //});

        console.log(newProduct);
        res.redirect(`/products/${newProduct.id}`);
      } else {
        let categories = await Category.findAll();
        let brands = await Brand.findAll();
        return res.render("productAdd", {
          errors: errors.errors,
          categories,
          brands,
          user: req.session.user,
        });
      }
    } catch (e) {
      console.log("Error al escribir en la base de datos " + e);
    }
  },

  edit: async function (req, res, next) {
    try {
      let pedidoProduct = await Product.findByPk(req.params.id, {
        include: ["category", "images", "user"],
      });

      if (pedidoProduct == null) return res.redirect("/");

      let pedidoCategories = await Category.findAll();

      let pedidoBrands = await Brand.findAll();

      let brands = await Brand.findAll();

      let color = "#FFFFFF";
      let descuento = true;

      res.render("productEdit", {
        product: pedidoProduct,
        categories: pedidoCategories,
        brands: pedidoBrands,
        brands,
        user: req.session.user,
        color,
        descuento,
      });
    } catch (e) {
      console.log("Error al obtener datos de la base de datos " + e);
    }
  },

  update: async (req, res, next) => {
    try {
      let errors = validationResult(req);
      // let pedidoProduct = await Product.findByPk(req.params.id, {
      //   include: ["category", "images"],
      // });
      let color = "#FFFFFF";
      let descuento = true;

      if (errors.isEmpty()) {
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
        if (req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            const newImage = await Image.create({
              productId: req.params.id,
              size: req.files[i].size,
              fileType: req.files[i].mimetype,
              route: req.files[i].filename,
            });
          }
        }
        res.redirect("/products/" + req.params.id);
      } else {
        let pedidoCategories = await Category.findAll();
        let pedidoBrands = await Brand.findAll();
        return res.render("productEdit", {
          errors: errors.errors,
          ...req.body,
          user: req.session.user,
          color,
          descuento,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  destroy: async (req, res) => {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/users/myProducts");
    } catch (e) {
      console.log("Error al eliminar el producto de la base de datos " + e);
    }
  },

  imgDestroy: async (req, res) => {
    try {
      await Image.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (e) {
      console.log("Error al eliminar el producto de la base de datos " + e);
    }
  },

  detail: async function (req, res, next) {
    try {
      let product = await Product.findByPk(req.params.id, {
        include: ["category", "images", "user", "brand", "tags"],
      });
      let related = await Product.findAll({
        include: [
          {
            association: "category",
            where: {
              name: product.category.name,
            },
          },
          "images",
        ],
        limit: 4,
      });
      let sameBrand = await Product.findAll({
        include: [
          {
            association: "brand",
            where: {
              name: product.brand.name,
            },
          },
          "images",
        ],
        limit: 4,
      });
      let match = [];
      let otherCategories = await Category.findAll({
        where: {
          id: {
            [Op.not]: [product.category.id],
          },
        },
      });
      for (const category of otherCategories) {
        let matchedProduct = await Product.findOne({
          include: [
            {
              association: "category",
              where: {
                name: category.name,
              },
            },
            "images",
          ],
        });
        match.push(matchedProduct);
      }
      let brands = await Brand.findAll();

      res.render("productDetail", {
        product,
        related,
        sameBrand,
        brands,
        match,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },

  brandDetail: async (req, res) => {
    try {
      let brand = await Brand.findByPk(req.params.id, {
        include: ["products"],
      });
      let brandProducts = await Product.findAll({
        include: [
          {
            association: "brand",
            where: {
              id: req.params.id,
            },
          },
          "images",
        ],
      });
      let brands = await Brand.findAll();

      res.render("brandPage", {
        brand,
        brands,
        brandProducts,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;
