const { Router } = require("express");
const GoodFact = require("./model");
const router = new Router();

router.post("/goodfact", (request, response, next) => {
  GoodFact.create(request.body)
    .then(goodfact => response.send(goodfact))
    .catch(errors => next(errors));
});

router.get("/goodfact", (request, response, next) => {
  GoodFact.findAndCountAll()
    .then(result =>
      response.send({ amount: result.count, goodfacts: result.rows })
    )
    .catch(errors => next(errors));
});

router.get("/goodfact/:id", (request, respose, next) => {
  GoodFact.findByPk(request.params.id)
    .then(goodfact => respose.send(goodfact))
    .catch(errors => next(errors));
});

module.exports = router;
