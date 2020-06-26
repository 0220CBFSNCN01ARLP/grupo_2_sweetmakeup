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

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Product, {
      as: "product",
      through: "product_tag",
      foreignKey: "tagId",
      otherKey: "productId",
      timestamps: false,
    });
  };

  return Tag;
};
