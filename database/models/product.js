module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(500),
    },
    ingredients: {
      type: dataTypes.STRING(500),
    },
    link: {
      type: dataTypes.STRING(300),
    },
    shipping: {
      type: dataTypes.STRING(300),
    },
    returnPolitic: {
      type: dataTypes.STRING(300),
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    }, // 0123456789,11
    discount: {
      type: dataTypes.DECIMAL(4, 2),
    },
    weight: {
      type: dataTypes.DECIMAL(10, 2),
    },
    height: {
      type: dataTypes.DECIMAL(10, 2),
    },
    width: {
      type: dataTypes.DECIMAL(10, 2),
    },
    length: {
      type: dataTypes.DECIMAL(10, 2),
    },
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Brand, {
      foreignKey: "brandId",
      as: "brand",
    });

    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Product.hasMany(models.Image, {
      foreignKey: "productId",
      as: "image",
    });

    Product.belongsToMany(models.User, {
      as: "user",
      through: "user_product",
      foreignKey: "productId",
      otherKey: "userId",
      timestamps: false,
    });

    Product.belongsToMany(models.Purchase, {
      as: "purchase",
      through: "product_purchase",
      foreignKey: "productId",
      otherKey: "purchaseId",
    });

    Product.belongsToMany(models.Tag, {
      as: "tag",
      through: "product_tag",
      foreignKey: "productId",
      otherKey: "tagId",
      timestamps: "false",
    });

    Product.belongsToMany(models.Color, {
      as: "color",
      through: "color_product",
      foreignKey: "productId",
      otherKey: "colorId",
      timestamps: "false",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
