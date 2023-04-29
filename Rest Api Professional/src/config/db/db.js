const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_Api', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false

});

sequelize.authenticate().then(() => {
    console.log('Database is connected');
  }).catch((err) => {
    console.log(err.message);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require('@models/user.model')(sequelize, DataTypes);
db.product = require('@models/product.model')(sequelize, DataTypes);
db.user.hasMany(db.product);
db.product.belongsTo(db.user);
db.customer = require('@models/customer.model')(sequelize, DataTypes);
module.exports = db;
