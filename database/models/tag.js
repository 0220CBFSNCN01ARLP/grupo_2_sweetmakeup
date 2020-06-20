module.exports = (sequelize, dataTypes) => {
  const Tag = sequelize.define("Tag", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: dataTypes.STRING(500), allowNull: false },
  });
  return Tag;
};
