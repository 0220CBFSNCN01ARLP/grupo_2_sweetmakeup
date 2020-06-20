module.exports = (sequelize, dataTypes) => {
  const Brand = sequelize.define("Brand", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500) },
  });
  return Brand;
};
