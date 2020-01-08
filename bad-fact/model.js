const Sequelize = require("sequelize");
const db = require("../db");

const BadFact = db.define("badfact", {
  fact: { type: Sequelize.STRING },
  source: { type: Sequelize.STRING }
});

module.exports = BadFact;
