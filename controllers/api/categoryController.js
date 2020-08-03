const { Category } = require("../../database/models");

let controller = {
  getAll: async (req, res) => {
    const categories = await Category.findAll();
    res.send(categories);
  },
};

module.exports = controller;
