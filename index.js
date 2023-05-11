const express = require('express');
const cors = require('cors');
const {
    CountriesRouters,
    RegionsRouters,
    CitiesRouters,
} = require('./routers');

const app = express()

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/countries', CountriesRouters);
app.use('/api/regions', RegionsRouters);
app.use('/api/cities', CitiesRouters);


app.listen(process.env.APP_PORT, () => {
   console.log(`Example app listening on port ${process.env.APP_PORT}`)
})
