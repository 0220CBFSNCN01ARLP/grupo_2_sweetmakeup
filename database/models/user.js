module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: { type: dataTypes.STRING(500), allowNull: true },
    lastName: { type: STRING(500), allowNull: true },
    email: { type: STRING(100), allowNull: true },
    password: { type: STRING(100), allowNull: true },
    avatar: { type: STRING(100), allowNull: true },
  });
  return User;
};
