const { Tag, Product, Brand } = require("../database/models");

let controller = {
  tagDetail: async (req, res, next) => {
    try {
      let tag = await Tag.findByPk(req.params.id, {
        include: ["products"],
      });
      let tagProducts = await Product.findAll({
        include: [
          {
            association: "tags",
            where: {
              id: req.params.id,
            },
          },
          "images",
        ],
      });
      let brandsHeader = await Brand.findAll({ limit: 10 });

      res.render("tagProduct", {
        tag,
        brandsHeader,
        tagProducts,
        user: req.session.user,
      });
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = controller;
