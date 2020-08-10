module.exports = (sequelize, dataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      street: { type: dataTypes.STRING(100) },
      number: { type: dataTypes.STRING(100) },
      city: { type: dataTypes.STRING(100) },
      province: { type: dataTypes.STRING(100) },
      zipCode: { type: dataTypes.STRING(100) },
      floor: { type: dataTypes.STRING(100) },
      apartment: { type: dataTypes.STRING(100) },
      phone: { type: dataTypes.STRING(100) },
      neighborhood: { type: dataTypes.STRING(100) },
      observations: { type: dataTypes.STRING(100) },
    },
    {
      tableName: "addresses",
    }
  );

  Address.associate = function (models) {
    Address.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Address.hasMany(models.Purchase, {
      foreignKey: "addressId",
      as: "purchase",
    });
  };

  return Address;
};
