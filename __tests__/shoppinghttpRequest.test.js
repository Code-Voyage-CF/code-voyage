const Amadeus = require('amadeus');
const { Sequelize } = require('sequelize');
const ShoppingActivity = require('../src/models/shoppingModel.js');
require('dotenv').config();

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Setting a higher timeout to avoid test timeouts
jest.setTimeout(30000);

// Set up Sequelize and sync the ShoppingActivity model
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './shopping.db',
});

beforeAll(async () => {
  await sequelize.sync();
});

let shoppingActivities;

beforeEach(async () => {
  const response = await amadeus.shopping.activities.get({
    latitude: 41.397158,
    longitude: 2.160873,
  });

  shoppingActivities = response.data;
});


test('should retrieve response data from shopping activities', () => {
  expect(shoppingActivities).toBeTruthy(); 
});

test('should retrieve an array of shopping activities', () => {
  expect(Array.isArray(shoppingActivities)).toBe(true); 
});

test('should retrieve shopping activity objects', () => {
  expect(shoppingActivities); 
});

test('should store the first five shopping activities in the database', async () => {
  const firstFiveActivities = shoppingActivities.slice(0, 5);

  const insertedActivities = await ShoppingActivity.bulkCreate(firstFiveActivities, { ignoreDuplicates: true });


  expect(insertedActivities.length).toBe(5); 
});
