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
      //user es parent, y purchase es el child = Parect.hasMany(models.Child)
      foreignKey: "userId",
      as: "purchase",
    });

    User.hasMany(models.Product, {
      as: "product",
      foreignKey: "userId",
      timestamps: false
    });
  };

  return User;
};
