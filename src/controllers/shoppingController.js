const amadeus = require('../config/amadeus.js');
const ShoppingActivity = require('../models/shoppingModel.js');

exports.getShoppingActivities = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization token is missing.' });
      }
      
    const { cityCode } = req.query;

    if (!cityCode) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const response = await amadeus.shopping.activities.get({
            cityCode,
        });

        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
};