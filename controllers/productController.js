const multer = require("multer");

// CRUD:
// CREATE UPDATE: Fer
// READ: Agus
// DELETE: Gena

const {
    getProducts,
    productsFilePath
} = require("../utils/products");
const {
    Product,
    Category,
    Brand
} = require("../database/models");

let controller = {
    // FER
    create: async function(req, res, next) {
        const categories = await Category.findAll();
        const brands = await Brand.findAll();
        res.render("productAdd", {
            categories,
            brands,
            user: req.session.user
        });
    },

    // FER

    store: async function(req, res, next) {
        console.log("fer");
        console.log(req.body.thematic);
        const newProduct = await Product.create({
            name: req.body.productName,
            price: req.body.price,
            brandId: req.body.brand,
            categoryId: req.body.thematic,
            discount: req.body.discount,
            description: req.body.description,
            weight: req.body.peso,
            height: req.body.alto,
            width: req.body.ancho,
            length: req.body.largo
        });
        console.log(newProduct);
        res.redirect(`/products/${newProduct.id}`);
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
    detail: async function(req, res, next) {
        let product = await Product.findByPk(req.params.id);
        let related = [];
        for (let i = 0; i < 4; i++) {
            let relatedProduct = await Product.findOne({
                where: {
                    categoryId: product.categoryId
                },
            });
            related.push(relatedProduct)
        };

        res.render("productDetail", {
            product,
            related,
            user: req.session.user,
        });
    },
};

module.exports = controller;