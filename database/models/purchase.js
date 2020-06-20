module.exports = (sequelize, dataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    street: { type: dataTypes.STRING(100), allowNull: true },
    number: { type: dataTypes.STRING(100), allowNull: true },
    city: { type: dataTypes.STRING(100), allowNull: true },
    province: { type: dataTypes.STRING(100), allowNull: true },
    zipCode: { type: dataTypes.STRING(100), allowNull: true },
    floor: { type: dataTypes.STRING(100), allowNull: true },
    apartment: { type: dataTypes.STRING(100), allowNull: true },
    phone: { type: dataTypes.STRING(100), allowNull: true },
    neighborhood: { type: dataTypes.STRING(100), allowNull: true },
    observations: { type: dataTypes.STRING(100), allowNull: true },
  });
  return Purchase;
};
