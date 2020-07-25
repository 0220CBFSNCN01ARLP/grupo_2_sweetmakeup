const multer = require("multer");

const {
    check,
    validationResult,
    body
} = require("express-validator");

const {
    Product,
    Category,
    Brand,
    Color,
    Image,
    User,
} = require("../database/models");
const {
    promiseImpl
} = require("ejs");

let controller = {
    // FER
    create: async function(req, res, next) {
        try {
            let categories = await Category.findAll();
            let brands = await Brand.findAll();
            res.render("productAdd", {
                categories,
                brands,
                user: req.session.user,
            });
        } catch (e) {
            console.log("Error al obtener información de la base de datos" + e);
        }
    },

    // FER
    store: async function(req, res, next) {
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

    // FER
    edit: async function(req, res, next) {
        //GET -> muestra el formulario
        try {
            let pedidoProduct = await Product.findByPk(req.params.id, {
                include: ["category", "images", "user"],
            });

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
        } catch (e) {
            console.log("Error al obtener datos de la base de datos " + e);
        }
    },

    //FER
    //PUT /products/edit/12385
    update: async(req, res, next) => {
        try {
            let errors = validationResult(req);
            let pedidoProduct = await Product.findByPk(req.params.id, {
                include: ["category", "images"],
            });
            let color = "#FFFFFF";
            let descuento = true;

            if (errors.isEmpty()) {
                await Product.update({
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
                            productId: newProduct.id,
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
                    product: pedidoProduct,
                    categories: pedidoCategories,
                    brands: pedidoBrands,
                    user: req.session.user,
                    color,
                    descuento,
                });
            }
        } catch (e) {
            console.log("Error al escribir en la base de datos " + e);
        }
    },

    //GENARO

    destroy: async(req, res) => {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.redirect("/");
        } catch (e) {
            console.log("Error al eliminar el producto de la base de datos " + e);
        }
    },

    detail: async function(req, res, next) {
        try {
            let product = await Product.findByPk(req.params.id, {
                include: ["category", "images", "user"],
            });
            let related = await Product.findAll({
                include: [{
                        association: "category",
                        where: {
                            name: product.category.name,
                        },
                    },
                    "images",
                ],
                limit: 4,
            });
            res.render("productDetail", {
                product,
                related,
                user: req.session.user,
            });
        } catch (e) {
            console.log("Error al obtener información de la base de datos " + e);
        }
    },
};

module.exports = controller;