const User = require('./user.model');

const users = [];

const petya = new User({
  name: 'PETYA',
  login: 'petya1993',
  password: 'P@55w0rd1'
});
users.push(petya);

const vova = new User({
  name: 'VOVA',
  login: 'vova1987',
  password: 'P@55w0rd2'
});
users.push(vova);

const masha = new User({
  name: 'MASHA',
  login: 'masha_beauty',
  password: 'P@55w0rd3'
});
users.push(masha);

const getAll = async () => {
  return users;
};

module.exports = { getAll };
