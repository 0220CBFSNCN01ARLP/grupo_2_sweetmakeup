module.exports = (sequelize, dataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: dataTypes.STRING(500) },
    },
    {
      tableName: "brands",
    }
  );

  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      foreignKey: "brandId",
      as: "products",
    });

    Brand.hasMany(models.Color, {
      foreignKey: "brandId",
      as: "colors",
    });
  };

  return Brand;
};
