const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = newUser => new User(newUser);

const getUser = params =>
  getAll().then(data => data.find(user => user.id === params.id));

const updateUser = (user, updateInfo) => Object.assign(user, updateInfo);

const deleteUser = (user, usersList) =>
  usersList.splice(usersList.indexOf(user), 1);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
