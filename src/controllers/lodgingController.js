const amadeus = require('../config/amadeus.js'); // Assuming you have a config file for Amadeus
const HotelOffer = require('../models/lodgingModel.js');


exports.getHotelOffers = async (req, res) => {
  const { cityCode, checkInDate, checkOutDate, adults } = req.query;

  if (!cityCode || !checkInDate || !checkOutDate || !adults) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const response = await amadeus.shopping.hotelOffersSearch.get({
      cityCode,
      checkInDate,
      checkOutDate,
      adults,
    });

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
};
