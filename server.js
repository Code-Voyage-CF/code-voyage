const express = require("express");
const dotenv = require('dotenv').config();
const flightRoutes = require('./src/routes/flightsRoute.js');
const shoppingRoutes = require('./src/routes/shoppingRoute.js');
const authRoute = require('./src/routes/authRoute.js');


const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD

=======
app.use(express.json());  // This should come before any routes are defined
app.use('/auth', authRoute); 
>>>>>>> 8041baa9078fe41056a45980c07b76a5860fd743
app.use('/flights', flightRoutes);
app.use('/shopping', shoppingRoutes);

// Uncomment to enable the root route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
