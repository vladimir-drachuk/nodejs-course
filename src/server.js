/* eslint-disable no-process-exit */
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const { rejectLog, uncaughtLog } = require('./common/logger');
const mongoose = require('mongoose');
const createAdmin = require('./resources/users/user.mockdata');

process.on('uncaughtException', err => {
  uncaughtLog(err);
  setTimeout(() => process.exit(1), 100);
});
process.on('unhandledRejection', (reason, promise) => {
  rejectLog(reason, promise);
});

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection.once('open', () => {
  console.log('Data base connected');
  db.dropDatabase();
  createAdmin();

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
