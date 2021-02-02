const Sequelize = require('sequelize');
const connection = require('./database');

const Ask = connection.define('questions', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Ask.sync({force: false}).then(() => console.log('🔃 synchronized questions table'));

module.exports = Ask;