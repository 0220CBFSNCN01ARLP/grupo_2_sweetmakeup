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
  products: async function (req, res) {
    let products = await Product.findAll({ include: "category" });
    // cambiar cada producto, sacarle propiedades
    let processedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        detail: `/api/products/${product.id}`,
      };
    });

    let response = {
      count: processedProducts.length,
      products: processedProducts,
    };
    res.send(response);
  },

  detail: async function (req, res) {
    let product = await Product.findByPk(req.params.id, {
      include: ["category", "images", "tags"],
    });
    let imgURL = "";
    if (product.images.length > 0) {
      let imgId = product.images[0].id;
      imgURL = `http://localhost:3000/api/images/${imgId}`;
    }
    let response = {
      name: product.name,
      id: product.id,
      price: product.price,
      brandId: product.brand,
      discount: product.discount,
      description: product.description,
      shipping: product.shipping,
      link: product.link,
      ingredients: product.ingredients,
      returnPolitic: product.returnPolitic,
      weight: product.weight,
      height: product.height,
      width: product.width,
      length: product.length,
      imgURL: imgURL,
      category: product.category,
      tags: product.tags,
      images: product.images,
    };
    res.send(response);
  },
};

module.exports = controller;
