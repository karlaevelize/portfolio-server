const { Router } = require("express");
const Sequelize = require("sequelize");
const BadFact = require("./model");
const router = new Router();

router.post("/badfact", (request, response, next) => {
  BadFact.create(request.body)
    .then(badfact => response.send(badfact))
    .catch(errors => next(errors));
});

router.get("/badfact", (request, response, next) => {
  BadFact.findAndCountAll()
    .then(result =>
      response.send({ amount: result.count, badfacts: result.rows })
    )
    .catch(errors => next(errors));
});

router.get("/badfact/:id", (request, respose, next) => {
  BadFact.findByPk(request.params.id)
    .then(badfact => respose.send(badfact))
    .catch(errors => next(errors));
});

router.get("/badfacts/random", (request, response, next) => {
  BadFact.findAll({ order: Sequelize.literal("random()"), limit: 1 })
    .then(whyfact => response.send(whyfact))
    .catch(errors => next(errors));
});

module.exports = router;
