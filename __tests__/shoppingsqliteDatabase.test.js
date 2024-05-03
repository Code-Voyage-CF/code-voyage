const { Sequelize } = require('sequelize');
const ShoppingActivity = require('../src/models/shoppingModel.js');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './shopping.db', 
});

jest.setTimeout(30000);

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
  
};

beforeEach(async () => {
  await ShoppingActivity.create(shoppingData);
});

test('should store a shopping activity in the database', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, 
  });

  expect(retrievedShoppingActivity).not.toBeNull();
});

test('should check the name of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { category: shoppingData.category }, 
  });

  expect(retrievedShoppingActivity.name).toBe(shoppingData.name);
});

test('should check the category of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, 
  });

  expect(retrievedShoppingActivity.category).toBe(shoppingData.category);
});

test('should check the rating of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, 
  });

  expect(retrievedShoppingActivity.rating).toBe(shoppingData.rating);
});

test('should check the price of the retrieved shopping activity', async () => {
  const retrievedShoppingActivity = await ShoppingActivity.findOne({
    where: { name: shoppingData.name }, 
  });

  expect(retrievedShoppingActivity.price).toBe(shoppingData.price);
});

