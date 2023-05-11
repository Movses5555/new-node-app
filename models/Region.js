const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Region = sequelize.define('regions', {
  RegionName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'regions',
  timestamps: false
});


module.exports = Region;
