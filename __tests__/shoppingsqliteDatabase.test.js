const { Sequelize } = require('sequelize');
const ShoppingActivity = require('../src/models/shoppingModel.js'); // Update the path to your model if needed
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './shopping.db', // Update the database path if needed
});

jest.setTimeout(10000);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync the model with the SQLite database
});

const shoppingData = {
  // Define your shopping activity data here
  // Example:
  name: 'Shopping Activity',
  category: 'Category',
  rating: 4.5,
  price: 100,
  // Add more fields as needed
};

beforeEach(async () => {
  await ShoppingActivity.create(shoppingData); // Insert test data into the database
});

test('should store a shopping activity in the database', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, // Adjust the query condition as needed
  });

  expect(retrievedShoppingActivity).not.toBeNull(); // Check if the shopping activity is retrieved
});

test('should check the name of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { category: shoppingData.category }, // Adjust the query condition as needed
  });

  expect(retrievedShoppingActivity.name).toBe(shoppingData.name);
});

test('should check the category of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, // Adjust the query condition as needed
  });

  expect(retrievedShoppingActivity.category).toBe(shoppingData.category);
});

test('should check the rating of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, // Adjust the query condition as needed
  });

  expect(retrievedShoppingActivity.rating).toBe(shoppingData.rating);
});

test('should check the price of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, // Adjust the query condition as needed
  });

  expect(retrievedShoppingActivity.price).toBe(shoppingData.price);
});