const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Country = sequelize.define('countries', {
  CountryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'countries',
  timestamps: false
});

module.exports = Country;



