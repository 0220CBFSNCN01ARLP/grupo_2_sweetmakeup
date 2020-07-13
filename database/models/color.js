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
    Color.belongsTo(models.Brand, {
      as: "brand",
      foreignKey: "brandId",
    });
  };
  return Color;
};
