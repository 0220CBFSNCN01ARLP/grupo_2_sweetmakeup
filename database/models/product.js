module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500), allowNull: false },
    description: { type: dataTypes.STRING(500) },
    ingredients: { type: dataTypes.STRING(500) },
    price: { type: dataTypes.DECIMAL(10, 2), allowNull: false }, // 666666,78
    dicount: { type: dataTypes.DECIMAL(4, 2) },
    weight: { type: dataTypes.DECIMAL(10, 2) },
    height: { type: dataTypes.DECIMAL(10, 2) },
    width: { type: dataTypes.DECIMAL(10, 2) },
    length: { type: dataTypes.DECIMAL(10, 2) },
  });
  return Product;
};
