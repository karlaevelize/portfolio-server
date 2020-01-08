const { Router } = require("express");
const Sequelize = require("sequelize");
const WhyFact = require("./model");
const router = new Router();

router.post("/whyfact", (request, response, next) => {
  WhyFact.create(request.body)
    .then(whyfact => response.send(whyfact))
    .catch(errors => next(errors));
});

router.get("/whyfact", (request, response, next) => {
  WhyFact.findAndCountAll()
    .then(result =>
      response.send({ amount: result.count, whyfacts: result.rows })
    )
    .catch(errors => next(errors));
});

router.get("/whyfact/:id", (request, respose, next) => {
  WhyFact.findByPk(request.params.id)
    .then(whyfact => respose.send(whyfact))
    .catch(errors => next(errors));
});

router.get("/whyfacts/random", (request, response, next) => {
  WhyFact.findAll({ order: Sequelize.literal("random()"), limit: 1 })
    .then(whyfact => response.send(whyfact))
    .catch(errors => next(errors));
});

module.exports = router;
