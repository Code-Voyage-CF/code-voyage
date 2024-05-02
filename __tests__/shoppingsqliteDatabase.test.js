const { Sequelize, DataTypes } = require('sequelize');
const { getShoppingActivities } = require('../src/controllers/shoppingController'); // Adjust the path as needed

// Define the test data
const testData = [
  { name: 'Shopping Activity 1', category: 'Category 1', rating: 4.5, price: 100 },
  { name: 'Shopping Activity 2', category: 'Category 2', rating: 4.0, price: 80 },
];

// Create a Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory database for testing
});

// Define and sync the ShoppingActivity model
const initDatabase = async () => {
  const ShoppingActivity = sequelize.define('ShoppingActivity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  await sequelize.sync({ force: true }); // Sync the model with the database, force: true drops existing tables

  console.log('Database synced');
  return ShoppingActivity;
};

// Mock amadeus module
jest.mock('../src/config/amadeus.js', () => ({
  shopping: {
    activities: {
      get: jest.fn().mockResolvedValue({
        data: testData,
      }),
    },
  },
}));

// Test cases
describe('ShoppingController', () => {
  let ShoppingActivity;

  // Before all tests, initialize the database and retrieve the model
  beforeAll(async () => {
    ShoppingActivity = await initDatabase();
  });

  it('should insert data into the database', async () => {
    // Call the controller function with mock request and response objects
    const req = { query: { cityCode: 'CITY_CODE' } };
    const res = { status: jest.fn(), json: jest.fn() };

    await getShoppingActivities(req, res);

    // Retrieve all records from the database
    const records = await ShoppingActivity.findAll();

    // Assert that the retrieved records match the test data
    expect(records.map(record => record.toJSON())).toEqual(testData);
  });

  it('should retrieve data from the database', async () => {
    // Call the controller function with mock request and response objects
    const req = { query: { cityCode: 'CITY_CODE' } };
    const res = { status: jest.fn(), json: jest.fn() };

    await getShoppingActivities(req, res);

    // Retrieve all records from the database
    const records = await ShoppingActivity.findAll();

    // Assert that the number of retrieved records matches the number of test data
    expect(records.length).toBe(testData.length);
  });
});