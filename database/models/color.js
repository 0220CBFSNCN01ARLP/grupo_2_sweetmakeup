module.exports = (sequelize, dataTypes) => {
  const Color = sequelize.define("Color", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500), allowNull: false },
  });

  Color.associate = function (models) {
    Color.belongsToMany(models.Product, {
      as: "product",
      through: "color_product",
      foreignKey: "colorId",
      otherKey: "productId",
    });
  };
  return Color;
};
