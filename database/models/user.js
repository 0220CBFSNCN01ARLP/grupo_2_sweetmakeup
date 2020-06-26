module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: { type: dataTypes.STRING(500) },
    lastName: { type: dataTypes.STRING(500) },
    email: { type: dataTypes.STRING(100) },
    password: { type: dataTypes.STRING(100) },
    avatar: { type: dataTypes.STRING(100) },
  });

  User.associate = function (models) {
    User.hasMany(models.Address, {
      foreignKey: "userId",
      as: "address",
    });

    User.hasMany(models.Purchase, {
      foreignKey: "userId",
      as: "purchase",
    });

    User.belongsToMany(models.Product, {
      as: "product",
      through: "user_product",
      foreignKey: "userId",
      otherKey: "productId",
      timestamps: false,
    });
  };

  return User;
};
