module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
    },
    {
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Address, {
      foreignKey: "userId",
      as: "addresses",
    });

    User.hasMany(models.Purchase, {
      foreignKey: "userId",
      as: "purchases",
    });

    User.hasMany(models.Product, {
      as: "products",
      foreignKey: "userId",
      timestamps: false,
    });

    User.belongsTo(models.Role, {
      as: "role",
      foreignKey: "roleId",
    });
  };

  return User;
};
