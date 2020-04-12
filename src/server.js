/* eslint-disable no-process-exit */
const { PORT } = require('./common/config');
const app = require('./app');
const { rejectLog, uncaughtLog } = require('./common/logger');

process.on('uncaughtException', err => {
  uncaughtLog(err);
  setTimeout(() => process.exit(1), 100);
});
process.on('unhandledRejection', (reason, promise) => {
  rejectLog(reason, promise);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
