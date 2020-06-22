module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500), allowNull: false },
    description: { type: dataTypes.STRING(500) },
    ingredients: { type: dataTypes.STRING(500) },
    price: { type: dataTypes.DECIMAL(10, 2), allowNull: false }, // 0123456789,11
    discount: { type: dataTypes.DECIMAL(4, 2) },
    weight: { type: dataTypes.DECIMAL(10, 2) },
    height: { type: dataTypes.DECIMAL(10, 2) },
    width: { type: dataTypes.DECIMAL(10, 2) },
    length: { type: dataTypes.DECIMAL(10, 2) },
  });

  Product.associate = function (models) {
    Product.belongsTo(models.brand, {
      foreignKey: "brandId",
      as: "brand",
    });

    Product.belongsTo(models.category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Product.hasMany(models.image, {
      foreignKey: "productId",
      as: "image",
    });

    Product.belongsToMany(models.user, {
      as: "user",
      through: "user_product",
      foreignKey: "productId",
      otherKey: "userId",
      timestamps: false,
    });

    Product.belongsToMany(models.purchase, {
      as: "purchase",
      through: "product_purchase",
      foreignKey: "productId",
      otherKey: "purchaseId",
      timestamps: false,
    });

    Product.belongsToMany(models.tag, {
      as: "tag",
      through: "product_tag",
      foreignKey: "productId",
      otherKey: "tagId",
      timestamps: false,
    });

    Product.belongsToMany(models.color, {
      as: "color",
      through: "color_product",
      foreignKey: "productId",
      otherKey: "colorId",
      timestamps: false,
    });

    Product.hasMany(models.product_purchase, {
      foreignKey: "productId",
      as: "product_purchase",
    });
  };

  return Product;
};
