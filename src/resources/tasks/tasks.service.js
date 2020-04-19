const tasksRepo = require('./tasks.db.repository');

const getAll = () => tasksRepo.getAll();

const getAllById = id => tasksRepo.getAllById(id);

const createTask = (id, newTask) => tasksRepo.createTask(id, newTask);

const getTaskById = id => tasksRepo.getTaskById(id);

const clearTaskByUserId = userId => tasksRepo.clearTaskByUserId(userId);

const updateTask = (params, updateInfo) =>
  tasksRepo.updateTask(params, updateInfo);

const deleteTask = id => tasksRepo.deleteTask(id);

const deleteTaskByBoard = boardId => tasksRepo.deleteTaskByBoard(boardId);

module.exports = {
  getAll,
  getAllById,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  clearTaskByUserId,
  deleteTaskByBoard
};
