const Sequelize = require('sequelize');

const connection = new Sequelize('miniYahoo', 'root', '1258', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;