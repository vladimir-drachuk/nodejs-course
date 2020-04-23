const User = require('./user.model');

const createAdmin = () =>
  User.create({ login: 'admin', password: 'admin', name: 'vladimir' });

module.exports = createAdmin;
