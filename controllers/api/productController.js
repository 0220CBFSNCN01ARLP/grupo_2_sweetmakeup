const {
    Product,
    Category,
    Brand,
    Color,
    Image,
    User,
    Tag,
  } = require("../../database/models");

let controller = {
    products: async function(req, res) {
        let products = await Product.findAll({include: "category"});
        // cambiar cada producto, sacarle propiedades
        let processedProducts = products.map((product)=>{
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                detail: `/api/products/${product.id}`
            }
        })

        let response = {
            count: processedProducts.length,
            products: processedProducts,
        
        }
        res.send(response)
    },

    detail: async function(req, res) {
        let product = await Product.findByPk(req.params.id, {
            include: [
                "category",
                "images",
                "tags"
            ]
        });
        let response = {
            ...product,
            imageURL: "pepito"
        }
        res.send(product)
    }
}

module.exports = controller