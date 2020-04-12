const { errorLog } = require('./logger');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const errorHandler = (res, message) => {
  res.status(NOT_FOUND).json(message);
  errorLog('not found', NOT_FOUND);
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
