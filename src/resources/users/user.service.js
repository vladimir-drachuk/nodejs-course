const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();

const createUser = newUser => usersRepo.createUser(newUser);

const getUser = id => usersRepo.getUser(id);

const updateUser = (user, updateInfo) => usersRepo.updateUser(user, updateInfo);

const deleteUser = id => {
  usersRepo.deleteUser(id);
  taskService.clearTaskByUserId(id);
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
