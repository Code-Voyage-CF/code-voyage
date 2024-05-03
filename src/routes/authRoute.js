const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const signup = require('../middleware/signup');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;