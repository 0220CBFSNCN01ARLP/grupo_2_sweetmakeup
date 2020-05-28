const fs = require("fs");
const path = require("path");
const {
    getProducts,
    productsFilePath
} = require("../utils/products");

let controller = {

    create: function(req, res, next) {
        res.render("productAdd");
    },

    store: function(req, res, next) {
        const products = getProducts();
        //buscar el ID máximo entre los productos existentes, y setear el nuevo como maxId + 1 para asegurar que no se repitan
        const maxId = Math.max(...products.map((o) => o.id), 0);
        let newId = maxId + 1;
        let newProduct = {
            id: newId,
            ...req.body
        };
        console.log(newProduct);
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
        res.redirect("/");
    },

    edit: (req, res) => {
        //GET -> muestra el formulario

        const products = getProducts();
        const product = products.find((e) => {
            return e.id == req.params.id;
        });

        if (product == null) return res.redirect("/");

        res.render("productEdit", {
            product,
        });
    },
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

    detail: function(req, res, next) {
        const products = getProducts();
        const product = products.find((e) => {
            return e.id == req.params.id;
        });
        if (product == null){
            return res.redirect("/")
        };
        res.render("productDetail", {
            product
        });
    },
};

module.exports = controller;