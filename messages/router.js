const { Router } = require("express");
const Message = require("./model");

function factory(stream) {
  const router = new Router();

  router.get("/message", async (request, response, next) => {
    try {
      const messages = await Message.findAll();
      response.send(messages);
    } catch (error) {
      next(error);
    }
  });

  router.post("/message", async (request, response, next) => {
    try {
      const message = await Message.create(request.body);
      const action = {
        type: "NEW_MESSAGE",
        payload: message
      };
      const string = JSON.stringify(action);
      stream.send(string);
      response.send(message);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

module.exports = factory;
