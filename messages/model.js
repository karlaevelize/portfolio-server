const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  name: Sequelize.STRING,
  text: Sequelize.TEXT
});

module.exports = Message;
