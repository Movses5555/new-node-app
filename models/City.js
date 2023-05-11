const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const City = sequelize.define('cities', {
  CityName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  regionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'cities',
  timestamps: false
});

module.exports = City;

