module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',
      {
        Id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Title: {
          type: DataTypes.STRING,
          allowNull: false,
          force: true,
        },
        Price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          force: true,
        },
      },
      {
        tableName:"tbl_product",
        timestamps: false
      }
    );
    return Product;
  };