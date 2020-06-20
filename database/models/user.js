module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: { type: dataTypes.STRING(500) },
    lastName: { type: STRING(500) },
    email: { type: STRING(100) },
    password: { type: STRING(100) },
    avatar: { type: STRING(100) },
  });
  return User;
};
