const { Sequelize } = require('sequelize');
const config = require('config');

const mssqlDBConfig = config.get('mssqlDB');

const sequelize = new Sequelize(mssqlDBConfig);


module.exports = sequelize;

