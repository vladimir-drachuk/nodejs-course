const { PORT } = require('./common/config');
const app = require('./app');
const { rejectLog, uncaughtLog } = require('./common/logger');

process
  .on('unhandledRejection', (reason, promise) => {
    rejectLog(reason, promise);
  })
  .on('uncaughtException', err => {
    uncaughtLog(err);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
