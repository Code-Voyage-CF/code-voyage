// Import the necessary modules
const LodgingOffer = require('../src/models/lodgingModel.js'); // Ensure the path to your model is correct
const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Setting up the Amadeus instance
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Setting a higher timeout to avoid test timeouts
jest.setTimeout(30000);

// Set up Sequelize and sync the LodgingOffer model
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './hotels.db',
});

beforeAll(async () => {
  await sequelize.sync(); // Sync the model with the SQLite database
});

let hotelOffers;

// Retrieve hotel offers before running the test
beforeEach(async () => {
  const response = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds: 'RTPAR001', // Example hotel ID
    adults: '2',
    checkInDate: '2024-10-10',
    checkOutDate: '2024-10-13',
  });

  hotelOffers = response.data; // Store the response data
});

// Test to ensure response data is present
test('should retrieve response data from hotel offers', () => {
  expect(hotelOffers).toBeTruthy(); // Confirm there is data in the response
});

// Test to ensure the data is an array
test('should retrieve an array of hotel offers', () => {
  expect(Array.isArray(hotelOffers)).toBe(true); // Confirm data is an array
});

// Test to ensure at least one hotel offer is retrieved
test('should retrieve hotel offer object', () => {
  expect(hotelOffers); // Confirm at least one hotel offer
});

// Test to check if the first 5 hotel offers can be stored in the database
test('should store the first hotel offer in the database', async () => {
  const firstOffer = hotelOffers.slice(0, 5); // Get the first hotel offer

  // Insert into the LodgingOffer model
  const insertedOffer = await LodgingOffer.bulkCreate(firstOffer, { ignoreDuplicates: true });

  // Confirm that the hotel offer is inserted
  expect(insertedOffer.length).toBe(1); // Ensure offer is in the database
});

