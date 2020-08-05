const { Brand, Product } = require("../database/models");

let controller = {
  brand: async (req, res, next) => {
    let brandsHeader = await Brand.findAll({ limit: 10 });
    let brands = await Brand.findAll();
    res.render("brands", { brands, brandsHeader });
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
      let brandsHeader = await Brand.findAll({ limit: 10 });

      res.render("brandPage", {
        brand,
        brandsHeader,
        brandProducts,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;
