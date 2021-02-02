const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define("answers", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  questionID: {
    type: Sequelize.STRING,
    allowNull: false,
  }

});

Answer.sync({ force: false }).then(() => console.log('🔃 synchronized answers table'));

module.exports = Answer;