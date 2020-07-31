const {
    Product,
    Image,
    
  } = require("../../database/models");

let controller = {
    getOne: async function (req, res) {
        let image = await Image.findByPk(req.params.id);
        let imageRoute = `/img/products/${image.route}`
        let processedImg = {
            ...image,
            url: imageRoute
        }
        res.send(processedImg)
    }
}

module.exports = controller