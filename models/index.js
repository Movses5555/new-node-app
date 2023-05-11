const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

// Test the connection
sequelize.authenticate()
  .then(async() => {
    console.log('Database connection has been established successfully.')
  })
  .catch((error) => console.error('Unable to connect to the database:', error));


const Country = require('./Country.js');
const Region = require('./Region.js');
const City = require('./City.js');

Country.hasMany(Region);
Region.belongsTo(Country);

Region.hasMany(City);
City.belongsTo(Region);


module.exports = { Country, Region, City };