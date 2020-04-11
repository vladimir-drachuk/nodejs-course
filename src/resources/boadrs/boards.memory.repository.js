const Board = require('./boards.model');

const boards = [];

const getAll = async () => boards;

const createBoard = newBoard => {
  const board = new Board(newBoard);
  getAll().then(boardList => boardList.push(board));
  return board;
};

const getBoard = id =>
  getAll().then(data => data.find(board => board.id === id));

const updateBoard = (board, updateInfo) => Object.assign(board, updateInfo);

const deleteBoard = board =>
  getAll().then(boardsList => boardsList.splice(boardsList.indexOf(board), 1));

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
