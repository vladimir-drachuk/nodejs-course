const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.simple(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'src/logs/info.log'
    })
  ]
});

const requestLog = req => {
  const { method, query, url, body } = req;
  logger.log(
    'info',
    `${method} request:
      url: ${url} 
      query params: ${JSON.stringify(query)} 
      request body: ${JSON.stringify(body)}`
  );
};

const rejectLog = (reason, promise) =>
  logger.log(
    'error',
    `${JSON.stringify(promise)} rejected for a reason ${reason}`
  );

const uncaughtLog = err => logger.log(`Uncaught error: ${err}`);

module.exports = { requestLog, rejectLog, uncaughtLog };
