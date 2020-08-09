
const {
  Product,
  Brand,
  Sequelize,
} = require("../database/models");
const Op = Sequelize.Op;


let controller = {
  index: async function (req, res) {
    try {
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
  
      let brandsHeader = await Brand.findAll({ limit: 10 });
  
      res.render("index", {
        ojos,
        labios,
        cejas,
        rostro,
        brandsHeader,
        user: req.session.user,
      });
    } catch (error) {
      console.error(error)
    }
    
  },

  cart: async function (req, res, next) {
    try {
      let subtotal = 0;
    let discountTotal = 0;
    let discountDecimal = 0;
    let totalDecimal = 0;
    let total = 0;
    const realProducts = [];
    if (req.session.products) {
      for (let sessionProduct of req.session.products) {
        const realProduct = await Product.findByPk(sessionProduct.id, {
          include: ["images"],
        });
        realProduct.count = sessionProduct.count;
        realProducts.push(realProduct);
        subtotal += Number(realProduct.price * sessionProduct.count);
        discountTotal += Number(
          (realProduct.discount / 100) * realProduct.price * realProduct.count
        );
      }
      subtotal = subtotal.toFixed(2);
      discountDecimal = discountTotal.toFixed(2);
      total = subtotal - discountDecimal;
      totalDecimal = total.toFixed(2);
    }
    let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("productCart", {
      user: req.session.user,
      products: realProducts,
      discountDecimal,
      totalDecimal,
      subtotal,
      brandsHeader,
    });
    } catch (error) {
      console.error(error)
    }
    
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
    let brandsHeader = await Brand.findAll({ limit: 10 });

    res.render("section", {
      title: "ojos",
      products: productsOjos,
      brandsHeader,
      user: req.session.user,
    });
  },

  rostro: async function (req, res, next) {
    try {
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
      let brandsHeader = await Brand.findAll({ limit: 10 });
  
      res.render("section", {
        title: "rostro",
        products: productsRostro,
        brandsHeader,
        user: req.session.user,
      });
    } catch (error) {
      console.error(error)
    }
    
  },

  cejas: async function (req, res, next) {
    try {
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
      let brandsHeader = await Brand.findAll({ limit: 10 });
  
      res.render("section", {
        title: "cejas",
        products: productsCejas,
        brandsHeader,
        user: req.session.user,
      });
    } catch (error) {
      console.error(error)
    }
  },

  labios: async function (req, res, next) {
    try {
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
      let brandsHeader = await Brand.findAll({ limit: 10 });
  
      res.render("section", {
        title: "labios",
        products: productsLabios,
        brandsHeader,
        user: req.session.user,
      });
    } catch (error) {
     console.error(error) 
    }
    
  },

  search: async function (req, res, next) {
    try {
      let productSearch = await Product.findAll({
        include: ["category", "images"],
  
        where: {
          name : {
            [Op.like]: `%${req.body.search}%`
          }
        },
      });
      let brandsHeader = await Brand.findAll({ limit: 10 });
  
      res.render("searchResults", {
        title: `Resultados de la búsqueda: ${req.body.search}`,
        products: productSearch,
        brandsHeader,
        user: req.session.user,
      });
    } catch (error) {
      console.error(error)
    }
    
  },

  addToCart: async function (req, res, next) {
    try {
      let product = await Product.findOne({
        include: ["category", "images", "user"],
        where: {
          id: req.params.id,
        },
      });
      if (!req.session.products) {
        req.session.products = [];
      }
      const prod = req.session.products.find((e) => {
        return e.id == product.id;
      });
      if (!prod) {
        req.session.products.push({
          id: product.id,
          count: 1,
        });
      } else {
        prod.count++;
      }
      res.send("ok");
    } catch (error) {
      console.log(error);
    }
    
  },
  removeFromCart: async function (req, res, next) {
    if (!req.session.products) {
      req.session.products = [];
    }
    req.session.products = req.session.products.filter(
      (prod) => prod.id != req.params.id
    );
    res.redirect("/productCart");
  },
};

module.exports = controller;
