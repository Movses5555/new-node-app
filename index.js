const express = require('express');
const cors = require('cors');
const {
    CountriesRouters,
    RegionsRouters,
    CitiesRouters,
} = require('./routers');
const config = require('config');

const CORS_ORIGIN = config.get('corsOrigin');
const APP_PORT = config.get('appPort');

const app = express()

const corsOptions = {
    origin: CORS_ORIGIN,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/countries', CountriesRouters);
app.use('/api/regions', RegionsRouters);
app.use('/api/cities', CitiesRouters);


app.listen(APP_PORT, () => {
   console.log(`Example app listening on port ${APP_PORT}`)
})
