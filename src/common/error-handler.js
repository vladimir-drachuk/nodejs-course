const { errorLog } = require('./logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const errorHandler = (res, status, message) => {
  res.status(status).json(message);
  errorLog(message, status);
};

const handleInternalErr = (req, res) => {
  const statusText = getStatusText(INTERNAL_SERVER_ERROR);
  errorLog(statusText, req);
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = {
  errorHandler,
  handleInternalErr
};
