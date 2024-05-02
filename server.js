const express = require("express");
const dotenv = require('dotenv').config();
const flightRoutes = require('./src/routes/flightsRoute.js');
const shoppingRoutes = require('./src/routes/shoppingRoute.js');
const authRoute = require('./src/routes/authRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // This should come before any routes are defined
app.use('/auth', authRoute); 
app.use('/flights', flightRoutes);
app.use('/shopping', shoppingRoutes);
// app.use('/lodging', lodgingRoutes);
app.use('/auth', authRoute);

// Uncomment to enable the root route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
