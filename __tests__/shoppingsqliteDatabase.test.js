const { ShoppingActivity, sequelize } = require('../src/models/shoppingModel'); // Correct the path if necessary

describe('ShoppingActivity model', () => {
  beforeEach(async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Database synced');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  });

  it('should insert data into the database', async () => {
    const testData = [
      { name: 'Shopping Activity 1', category: 'Category 1', rating: 4.5, price: 100 },
      { name: 'Shopping Activity 2', category: 'Category 2', rating: 4.0, price: 80 },
    ];

    await ShoppingActivity.bulkCreate(testData);
    const records = await ShoppingActivity.findAll();

    expect(records.map(record => record.toJSON())).toEqual(testData);
  });
});