const express = require("express")


const app = express()
const PORT = process.env.PORT || 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const flightRoutes = require('./src/routes/flightsRoute.js');
// const lodgingRoutes = require('./src/routes/lodgingRoute.js');


app.use('/api', flightRoutes);
// app.use('/api', lodgingRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
});
