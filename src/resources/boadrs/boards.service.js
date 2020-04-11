const boardsRepo = require('./boards.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardsRepo.getAll();

const createBoard = newBoard => boardsRepo.createBoard(newBoard);

const getBoard = id => boardsRepo.getBoard(id);

const updateBoard = (board, updateInfo) =>
  boardsRepo.updateBoard(board, updateInfo);

const deleteBoard = board => {
  boardsRepo.deleteBoard(board);
  tasksService.deleteTaskByBoard(board.id);
  Promise.reject(2);
};

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
