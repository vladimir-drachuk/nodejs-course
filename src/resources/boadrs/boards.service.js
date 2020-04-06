const boardsRepo = require('./boards.memory.repository');
const Board = require('./boards.model');

const getAll = () => boardsRepo.getAll();

const createBoard = newBoard => {
  const board = new Board(newBoard);
  getAll().then(boards => boards.push(board));
  return board;
};

const getBoard = params =>
  getAll().then(data => data.find(board => board.id === params.id));

const updateBoard = (board, updateInfo) => Object.assign(board, updateInfo);

const deleteBoard = (user, usersList) =>
  usersList.splice(usersList.indexOf(user), 1);

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
