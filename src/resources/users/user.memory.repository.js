const User = require('./user.model');

const users = [];

const getAll = async () => {
  return users;
};

const createUser = newUser => {
  const user = new User(newUser);
  getAll().then(userList => userList.push(user));
  return user;
};

const getUser = id => getAll().then(data => data.find(user => user.id === id));

const updateUser = (user, updateInfo) => Object.assign(user, updateInfo);

const deleteUser = user =>
  getAll().then(usersList => usersList.splice(usersList.indexOf(user), 1));

module.exports = { getAll, createUser, getUser, updateUser, deleteUser };
