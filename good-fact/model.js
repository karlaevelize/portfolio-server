const Sequelize = require("sequelize");
const db = require("../db");

const GoodFact = db.define("goodfact", {
  fact: { type: Sequelize.TEXT },
  source: { type: Sequelize.STRING }
});

module.exports = GoodFact;
