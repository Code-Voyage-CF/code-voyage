const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './flights.db',
});

const FlightOffer = sequelize.define('FlightOffer', {
  originLocationCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationLocationCode: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  departureDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  adults: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  console.log('FlightOffer model synced with the database');
}).catch((error) => {
  console.error('Error syncing FlightOffer model:', error);
});

module.exports = FlightOffer;