const Board = require('./boards.model');

const boards = [];

const board = new Board({
  title: 'Disturbed'
});
boards.push(board);

const getAll = async () => boards;

module.exports = { getAll };
