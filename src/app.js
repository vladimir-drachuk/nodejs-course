/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boadrs/boards.router');
const loginRouter = require('./resources/login/login.router');
const { requestLog } = require('./common/logger');
const { checkAuthorization } = require('./common/checkAuthorization');
const {
  ErrorHandler,
  handleError,
  handleInternalErr
} = require('./common/error-handler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  requestLog(req);
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', checkAuthorization, userRouter);
app.use('/boards', checkAuthorization, boardsRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  handleInternalErr(err, res);
});

module.exports = app;
