const fs = require("fs");
const path = require("path");
const {
    Product,
    Image,
    
  } = require("../../database/models");

let controller = {
    getOne: async function (req, res) {
        let image = await Image.findByPk(req.params.id);
        let imageRoute = `../../public/img/products/${image.route}`;
        res.sendFile(path.join(__dirname, imageRoute))
    },
    delete: async function (req, res) {
        await Image.destroy({
            where: {
              id: req.params.id,
            },
          });
        res.send("ok")
    }
}

module.exports = controller