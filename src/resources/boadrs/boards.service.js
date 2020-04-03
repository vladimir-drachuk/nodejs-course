const boardsRepo = require('./boards.memory.repository');

const getAll = () => boardsRepo.getAll();

module.exports = { getAll };
