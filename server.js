const express = require("express");
const dotenv = require('dotenv').config();
const flightRoutes = require('./src/routes/flightsRoute.js');
const shoppingRoutes = require('./src/routes/shoppingRoute.js');
const lodgingRoutes = require('./src/routes/lodgingRoute.js');
const authRoute = require('./src/routes/authRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoute); 
app.use('/flights', flightRoutes);
app.use('/shopping', shoppingRoutes);
app.use('/lodging', lodgingRoutes);


app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
