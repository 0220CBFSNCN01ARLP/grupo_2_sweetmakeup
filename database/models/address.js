module.exports = (sequelize, dataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    street: { type: dataTypes.STRING(100), allowNull: true }, // x defecto es true
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
  return Address;
};
