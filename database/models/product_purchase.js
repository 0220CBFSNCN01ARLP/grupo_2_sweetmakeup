module.exports = (sequelize, dataTypes) => {
  const Product_Purchase = sequelize.define(
    "Product_Purchase",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      price: { type: dataTypes.DECIMAL(10, 2) },
      quantity: { type: dataTypes.DECIMAL(10, 2) },
    },
    {
      tableName: "product_purchase",
    }
  );

  Product_Purchase.associate = function (models) {
    Product_Purchase.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    Product_Purchase.belongsTo(models.Purchase, {
      foreignKey: "purchaseId",
      as: "purchase",
    });
  };

  return Product_Purchase;
};
