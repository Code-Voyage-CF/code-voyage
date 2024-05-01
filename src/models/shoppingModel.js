const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './shopping.db',
});

const ShoppingActivity = sequelize.define('ShoppingActivity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  console.log('ShoppingActivity model synced with the database');
}).catch((error) => {
  console.error('Error syncing ShoppingActivity model:', error);
});

module.exports = ShoppingActivity;