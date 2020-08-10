module.exports = (sequelize, dataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: dataTypes.STRING(500), allowNull: false },
    },
    {
      tableName: "tags",
    }
  );

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Product, {
      as: "products",
      through: models.Product_Tag,
      foreignKey: "tagId",
      otherKey: "productId",
    });
  };

  return Tag;
};
