const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
const ShoppingActivity = require('../src/models/shoppingModel.js'); // Ensure the path to your model is correct
require('dotenv').config();

// Setting up the Amadeus instance
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Setting a higher timeout to avoid test timeouts
jest.setTimeout(10000);

// Set up Sequelize and sync the ShoppingActivity model
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './shopping.db',
});

beforeAll(async () => {
  await sequelize.sync(); // Sync the model with the SQLite database
});

let shoppingActivities;

// Retrieve shopping activities before running the test
beforeEach(async () => {
  const response = await amadeus.shopping.activities.get({
    latitude: 41.397158,
    longitude: 2.160873,
  });

  shoppingActivities = response.data; // Store the response data
});

// Test to ensure response data is present
test('should retrieve response data from shopping activities', () => {
  expect(shoppingActivities).toBeTruthy(); // Confirm there is data in the response
});

// Test to ensure the data is an array
test('should retrieve an array of shopping activities', () => {
  expect(Array.isArray(shoppingActivities)).toBe(true); // Confirm data is an array
});

// Test to ensure at least five shopping activities are retrieved
test('should retrieve shopping activity objects', () => {
  expect(shoppingActivities.length).toBeGreaterThanOrEqual(5); // Confirm at least five offers
});

// Test to check if the first five shopping activities can be stored in the database
test('should store the first five shopping activities in the database', async () => {
  const firstFiveActivities = shoppingActivities.slice(0, 5); // Get the first five activities

  // Insert these into the ShoppingActivity model
  const insertedActivities = await ShoppingActivity.bulkCreate(firstFiveActivities, { ignoreDuplicates: true });

  // Confirm that exactly five shopping activities are inserted
  expect(insertedActivities.length).toBe(5); // Ensure five activities are in the database
});