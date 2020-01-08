const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const badFactRouter = require("./bad-fact/router");
const goodFactRouter = require("./good-fact/router");
const whyFactRouter = require("./why-fact/router");

const port = process.env.PORT || 4000;
const app = express();

const corsMiddleware = cors();
const parserMiddleware = bodyParser.json();

app.use(corsMiddleware);
app.use(parserMiddleware);

app.use(badFactRouter);
app.use(goodFactRouter);
app.use(whyFactRouter);

app.listen(port, () => console.log(`Hey, I'm on port ${port}!`));
