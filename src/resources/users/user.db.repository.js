const User = require('./user.model');

const getAll = () => User.find({}).exec();

const createUser = async newUser => {
  const user = await User.create(newUser);
  user.id = user._id;
  user.save();
  return user;
};

const getUser = id => User.findOne({ id }).exec();

const updateUser = (id, updateInfo) =>
  User.updateOne({ id }, updateInfo).exec();

const deleteUser = id => User.deleteOne({ id }).exec();

module.exports = { getAll, createUser, getUser, updateUser, deleteUser };
