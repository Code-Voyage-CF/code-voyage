const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();
const ShoppingActivity = require('../src/models/shoppingModel'); // Assuming your model is in shoppingModel.js

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory database for testing
});

// Define test data
const testData = [
  { name: 'Shopping Activity 1', category: 'Category 1', rating: 4.5, price: 100 },
  { name: 'Shopping Activity 2', category: 'Category 2', rating: 4.0, price: 80 },
];

// Test suite for ShoppingActivity model
describe('ShoppingActivity model', () => {
  // Before each test, sync the model with the database
  beforeEach(async () => {
    await ShoppingActivity.sync({ force: true });
  });

  // Test inserting data into the database
  it('should insert data into the database', async () => {
    // Insert test data into the database
    await ShoppingActivity.bulkCreate(testData);

    // Retrieve all records from the database
    const records = await ShoppingActivity.findAll();

    // Assert that the number of records matches the test data length
    expect(records.length).toBe(testData.length);
  });

  // Test retrieving data from the database
  it('should retrieve data from the database', async () => {
    // Insert test data into the database
    await ShoppingActivity.bulkCreate(testData);

    // Retrieve all records from the database
    const records = await ShoppingActivity.findAll();

    // Assert that the retrieved records match the test data
    expect(records).toEqual(testData);
  });
});