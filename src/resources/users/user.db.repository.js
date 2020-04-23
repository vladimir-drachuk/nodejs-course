const User = require('./user.model');

const getAll = () => User.find({}).exec();

const createUser = newUser => User.create(newUser);

const getUser = id => User.findOne({ _id: id });

const getUserByLogin = login => User.findOne({ login });

const updateUser = (id, updateInfo) => User.updateOne({ _id: id }, updateInfo);

const deleteUser = id => User.deleteOne({ id });

module.exports = {
  getAll,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByLogin
};
