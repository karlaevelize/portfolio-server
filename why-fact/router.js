const { Router } = require("express");
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
      response.send({ whyfacts: result.rows, amount: result.count })
    )
    .catch(errors => next(errors));
});

router.get("/whyfact/:id", (request, respose, next) => {
  WhyFact.findByPk(request.params.id)
    .then(whyfact => respose.send(whyfact))
    .catch(errors => next(errors));
});

module.exports = router;
