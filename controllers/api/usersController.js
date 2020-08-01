const { User } = require("../../database/models");

let controller = {
  getAll: async function (req, res) {
    let users = await User.findAll({include: "role"});

    let processedUsers = users.map((user)=>{
      let roleName = "no role"
      if (user.role) {
        roleName = user.role.name
      }
      return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: roleName,
          detail: `/api/users/${user.id}`
      }
  })
    res.send(processedUsers);
  },

  getOne: async function (req, res) {
    let user = await User.findByPk(req.params.id, {
      include: ["addresses", "purchases", "products", "role"],
    });

    let processedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      addresses: user.addresses,
      purchases: user.purchases,
      products: user.products,
      role: user.role,
    }

    res.send(processedUser);
  },
};

module.exports = controller;
