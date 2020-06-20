module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500), allowNull: false },
  });
  return Category;
};
