const express = require("express")


const app = express()
const PORT = process.env.PORT || 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const flightRoutes = require('./src/routes/flightsRoute.js');

app.use('/api', flightRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
});
