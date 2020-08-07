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
      let brandsHeader = await Brand.findAll({ limit: 10 });
      let brands = await Brand.findAll();
      res.render("productAdd", {
        categories,
        tags,
        brandsHeader,
        brands,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
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

        for (let name of req.body.etiqueta) {
          const tag = await Tag.findOne({
            where: {
              name: name,
            },
          });
          await newProduct.addTag(tag);
        }

        res.redirect(`/products/${newProduct.id}`);
      } else {
        let categories = await Category.findAll();
        let brandsHeader = await Brand.findAll({ limit: 10 });
        return res.render("productAdd", {
          errors: errors.errors,
          categories,
          brandsHeader,
          user: req.session.user,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  edit: async function (req, res, next) {
    try {
      let pedidoProduct = await Product.findByPk(req.params.id, {
        include: ["category", "images", "user", "tags"],
      });

      if (pedidoProduct == null) return res.redirect("/");

      let pedidoCategories = await Category.findAll();

      let pedidoBrands = await Brand.findAll();

      let brandsHeader = await Brand.findAll({ limit: 10 });

      let color = "#FFFFFF";
      let descuento = true;

      let tags = await Tag.findAll();

      res.render("productEdit", {
        product: pedidoProduct,
        categories: pedidoCategories,
        brands: pedidoBrands,
        brandsHeader,
        tags,
        user: req.session.user,
        color,
        descuento,
      });
    } catch (e) {
      console.error(e);
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
        const editedProduct = await Product.update(
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

        for (let name of req.body.etiqueta) {
          const tag = await Tag.findOne({
            where: {
              name: name,
            },
          });
          await editedProduct.addTag(tag);
        }

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
        let brandsHeader = pedidoBrands.slice(0, 10);
        return res.render("productEdit", {
          categories: pedidoCategories,
          brands: pedidoBrands,
          brandsHeader,
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
      console.error(e);
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
      console.error(e);
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
      let brandsHeader = await Brand.findAll({ limit: 10 });

      res.render("productDetail", {
        product,
        related,
        sameBrand,
        brandsHeader,
        match,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;
