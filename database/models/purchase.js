module.exports = (sequelize, dataTypes) => {
  const Purchase = sequelize.define(
    "Purchase",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      date: { type: dataTypes.DATE() },
      total: { type: dataTypes.DECIMAL(6, 2) },
      payment: { type: dataTypes.STRING(100) },
      invoice: { type: dataTypes.STRING(100) },
    },
    {
      tableName: "purchases",
    }
  );

  Purchase.associate = function (models) {
    Purchase.belongsTo(models.Address, {
      foreignKey: "addressId",
      as: "address",
    });

    Purchase.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Purchase.belongsToMany(models.Product, {
      as: "product",
      through: "product_purchase",
      foreignKey: "purchaseId",
      otherKey: "productId",
      timestamps: false,
    });

    Purchase.hasMany(models.Product_Purchase, {
      foreignKey: "purchaseId",
      as: "productPurchase",
    });
  };

  return Purchase;
};
