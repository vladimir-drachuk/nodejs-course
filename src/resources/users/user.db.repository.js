const User = require('./user.model');

const getAll = () => User.find({}).exec();

const createUser = async newUser => User.create(newUser);

const getUser = async id => User.findOne({ _id: id });

const updateUser = async (id, updateInfo) =>
  User.updateOne({ _id: id }, updateInfo);

const deleteUser = async id => User.deleteOne({ id });

module.exports = { getAll, createUser, getUser, updateUser, deleteUser };
