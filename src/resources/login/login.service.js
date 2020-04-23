const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getToken = (id, login) =>
  jwt.sign({ id, login }, process.env.JWT_SECRET_KEY);

const isPasswordValid = async (hashPassword, password) =>
  bcrypt.compare(password, hashPassword);

module.exports = { getToken, isPasswordValid };
