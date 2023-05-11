const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.mssql);


module.exports = sequelize;

