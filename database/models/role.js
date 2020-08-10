module.exports = (sequelize, dataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: dataTypes.STRING(20), allowNull: true },
    },
    {
      tableName: "roles",
    }
  );

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      as: "users",
      foreignKey: "roleId",
    });
  };
  return Role;
};
