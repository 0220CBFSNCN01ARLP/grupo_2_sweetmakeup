module.exports = (sequelize, dataTypes) => {
  const Product_Tag = sequelize.define("Product_Tag", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  Product_Tag.associate = function (models) {
    Product_Tag.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    Product_Tag.belongsTo(models.Tag, {
      foreignKey: "tagId",
      as: "tag",
    });
  };

  return Product_Tag;
};
