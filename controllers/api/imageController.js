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
    }
}

module.exports = controller