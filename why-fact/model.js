const Sequelize = require("sequelize");
const db = require("../db");

const WhyFact = db.define("whyfact", {
  fact: { type: Sequelize.TEXT },
  source: { type: Sequelize.STRING }
});

module.exports = WhyFact;
