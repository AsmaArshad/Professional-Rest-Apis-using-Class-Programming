module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
      {
        Id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false,
          force: true,
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: false,
          force: true,
          unique: true,
          isEmail: true,
        },
        Password: {
          type: DataTypes.STRING,
          allowNull: false,
          force: true,
        },
      },
      {
        tableName:"tbl_user",
        timestamps: false
      }
    );
    return User;
  };