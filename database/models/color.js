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
  return Color;
};
