const { User } = require("../../database/models");

let controller = {
  getOne: async function (req, res) {
    let user = await User.findByPk(req.params.id, {
      include: ["address", "product"],
    });

    let response = {
      ...user,
    };

    res.send(user);
  },
};

module.exports = controller;
