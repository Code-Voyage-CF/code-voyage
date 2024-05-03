const express = require('express');
const router = express.Router();
const lodgingController = require('../controllers/lodgingController.js');
const { simpleAuthCheck } = require('../middleware/authorize');

router.get('/hotel-offers', simpleAuthCheck, lodgingController.getHotelOffers);

module.exports = router;
