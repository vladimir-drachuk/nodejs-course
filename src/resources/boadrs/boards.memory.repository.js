const Board = require('./boards.model');
const Column = require('./column.model');

const boards = [];

const board = new Board({
  title: 'Disturbed',
  columns: [
    new Column({ title: 'Evolution', order: 1 }),
    new Column({ title: 'Alysum', order: 2 })
  ]
});
boards.push(board);

const getAll = async () => boards;

module.exports = { getAll };
