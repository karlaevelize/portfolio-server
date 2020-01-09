const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");
const router = new Router();

router.post("/user", (request, response, next) => {
  const user = {
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 3)
  };
  User.create(user)
    .then(user => response.send(user))
    .catch(errors => next(errors));
});

router.get("/user", (request, response, next) => {
  User.findAndCountAll()
    .then(result => response.send({ count: result.count, users: result.rows }))
    .catch(error => next(error));
});

module.exports = router;
