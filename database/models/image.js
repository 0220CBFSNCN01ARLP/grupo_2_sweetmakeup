module.exports = (sequelize, dataTypes) => {
  const Image = sequelize.define("Image", {
    id: {
      type: dataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    route: { type: dataTypes.STRING(500), allowNull: false },
    size: { type: dataTypes.STRING(500), allowNull: true },
    fileType: { type: dataTypes.STRING(500), allowNull: true },
    productId: { type: dataTypes.INTEGER(11), allowNull: false },
  });
  return Image;
};
