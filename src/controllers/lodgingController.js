const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './hotels.db',
});

const Lodging = sequelize.define('Lodging', {
  hotelName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cityCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hotelId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  offerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adults: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amenities: {
    type: DataTypes.JSON, // Assuming amenities are returned as JSON data
    allowNull: true
  },
  policies: {
    type: DataTypes.JSON, // Assuming policies are returned as JSON data
    allowNull: true
  },
  photos: {
    type: DataTypes.JSON, // Assuming photos are returned as JSON data
    allowNull: true
  }
}, {
  timestamps: false // We don't need timestamps for this model
});

module.exports = {
    createLodging: async function (data) {
        try {
          const lodging = await Lodging.create(data);
          console.log("Lodging entry created:", lodging.toJSON());
          return lodging; // Return the created lodging entry
        } catch (error) {
          console.error("Error creating lodging entry:", error);
          throw error;
        }
      },
      
  getLodgingsByCity: async function (cityCode) {
    try {
      const lodgings = await Lodging.findAll({ where: { cityCode: cityCode } });
      console.log("Lodgings retrieved for city:", cityCode);
      return lodgings;
    } catch (error) {
      console.error("Error retrieving lodgings for city:", error);
      throw error;
    }
  },
  // Add more controller functions as needed
};