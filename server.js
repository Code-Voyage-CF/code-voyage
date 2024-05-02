const express = require("express");
const dotenc = require('dotenv').config();
const flightRoutes = require('./src/routes/flightsRoute.js');
const shoppingRoutes = require('./src/routes/shoppingRoute.js');
const authRoute = require('./src/routes/authRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/flights', flightRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/auth', authRoute); 

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
