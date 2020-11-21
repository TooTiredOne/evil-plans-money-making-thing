const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const minionsRouter = require("./minions");

apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
