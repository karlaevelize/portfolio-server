const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const stream = new Sse();

const Message = require("./messages/model");

const badFactRouter = require("./bad-fact/router");
const goodFactRouter = require("./good-fact/router");
const whyFactRouter = require("./why-fact/router");
const userRouter = require("./user/router");
const messageRouterFactory = require("./messages/router");

const port = process.env.PORT || 4000;
const app = express();

const corsMiddleware = cors();
const parserMiddleware = bodyParser.json();
const messageRouter = messageRouterFactory(stream);

app.use(corsMiddleware);
app.use(parserMiddleware);

app.use(badFactRouter);
app.use(goodFactRouter);
app.use(whyFactRouter);
app.use(messageRouter);
app.use(userRouter);

app.get("/", (request, response) => {
  response.send("hello");
});

app.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    const action = {
      type: "ALL_MESSAGES",
      payload: messages
    };
    const string = JSON.stringify(action);
    stream.updateInit(string);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`Hey, I'm on port ${port}!`));
