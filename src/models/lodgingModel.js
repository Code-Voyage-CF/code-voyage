const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './lodgings.db',
});

const LodgingOffer = sequelize.define('LodgingOffer', {
  hotelIds: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  adults: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  console.log('LodgingOffer model synced with the database');
}).catch((error) => {
  console.error('Error syncing LodgingOffer model:', error);
});

module.exports = LodgingOffer;
