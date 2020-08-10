module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
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
      },
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
    },
    {
      tableName: "products",
      paranoid: true,
    }
  );

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
      as: "images",
    });

    Product.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
      timestamps: false,
    });

    Product.belongsToMany(models.Purchase, {
      as: "purchase",
      through: "product_purchase",
      foreignKey: "productId",
      otherKey: "purchaseId",
    });

    Product.belongsToMany(models.Tag, {
      as: "tags",
      through: models.Product_Tag,
      foreignKey: "productId",
      otherKey: "tagId",
    });
  };

  return Product;
};
