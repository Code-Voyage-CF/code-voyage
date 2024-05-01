const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController.js');

router.get('/shopping-activities', shoppingController.getShoppingActivities);

module.exports = router;