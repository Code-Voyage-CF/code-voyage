const { Sequelize } = require('sequelize');
const LodgingOffer = require('../src/models/lodgingModel.js'); // Import the LodgingOffer model
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './lodgings.db',
});

// Set timeout to avoid test timeouts
jest.setTimeout(10000);

// Sync the database before all tests
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync the model with the SQLite database, force: true will drop existing tables
});

// Sample lodging data for testing
const lodgingData = {
  hotelIds: 'RTPAR001',
  checkInDate: '2024-10-10',
  checkOutDate: '2024-10-13',
  adults: 2,
};

// Insert sample lodging data before each test
beforeEach(async () => {
  await LodgingOffer.create(lodgingData);
});

// Test to ensure lodging data is stored in the database
test('should store a lodging offer in the database', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging).not.toBeNull(); // Check if a lodging offer is retrieved from the database
});

// Test to check the hotelIds of the retrieved lodging offer
test('should check the hotelIds of the retrieved lodging offer', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging.hotelIds).toBe(lodgingData.hotelIds); // Check if the hotelIds match
});

// Test to check the checkInDate of the retrieved lodging offer
test('should check the checkInDate of the retrieved lodging offer', async () => {
  const retrievedLodging = await LodgingOffer.findOne({
    where: { hotelIds: lodgingData.hotelIds },
  });

  expect(retrievedLodging.checkInDate).toBe(lodgingData.checkInDate); // Check if the checkInDate matches
});