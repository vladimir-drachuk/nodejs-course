const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { errorHandler } = require('./error-handler');
const { UNAUTHORIZED } = require('http-status-codes');

const checkAuthorization = (req, res, next) => {
  const token = req.header('Authorization');
  try {
    req.user = jwt.verify(token.slice(7), JWT_SECRET_KEY);
  } catch (err) {
    errorHandler(res, UNAUTHORIZED, 'user not authorized');
    return;
  }
  next();
};

module.exports = { checkAuthorization };
