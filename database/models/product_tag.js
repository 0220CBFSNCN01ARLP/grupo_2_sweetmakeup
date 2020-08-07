module.exports = (sequelize, dataTypes) => {
  const Product_Tag = sequelize.define(
    "Product_Tag",
    {
      id: {
        type: dataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      tableName: "product_tag",
      timestamps: false,
    }
  );

  return Product_Tag;
};
