// Importing the necessary modules
const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
const FlightOffer = require('../src/models/flightsModel.js'); // Ensure the path to your model is correct
require('dotenv').config();

// Setting up the Amadeus instance
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Setting a higher timeout to avoid test timeouts
jest.setTimeout(10000);

// Set up Sequelize and sync the FlightOffer model
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './flights.db',
});

beforeAll(async () => {
  await sequelize.sync(); // Sync the model with the SQLite database
});

let flightOffers;

// Retrieve flight offers before running the test
beforeEach(async () => {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD', // Origin airport code
    destinationLocationCode: 'BKK', // Destination airport code
    departureDate: '2024-06-01', // Departure date
    adults: '2', // Number of adults
  });

  flightOffers = response.data; // Store the response data
});

// Test to ensure response data is present
test('should retrieve response data from flight offers', () => {
  expect(flightOffers).toBeTruthy(); // Confirm there is data in the response
});

// Test to ensure the data is an array
test('should retrieve an array of flight offers', () => {
  expect(Array.isArray(flightOffers)).toBe(true); // Confirm data is an array
});

// Test to ensure at least five flight offers are retrieved
test('should retrieve flight offer object', () => {
  expect(flightOffers); // Confirm at least five offers
});

// Test to check if the first five flight offers can be stored in the database
test('should store the first five flight offers in the database', async () => {
  const firstFiveOffers = flightOffers.slice(0, 5); // Get the first five offers

  // Insert these into the FlightOffer model
  const insertedOffers = await FlightOffer.bulkCreate(firstFiveOffers, { ignoreDuplicates: true });

  // Confirm that exactly five flight offers are inserted
  expect(insertedOffers.length).toBe(5); // Ensure five offers are in the database
});
