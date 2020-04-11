const tasksRepo = require('./tasks.memory.repository');

const getAll = () => tasksRepo.getAll();

const getAllById = id => tasksRepo.getAllById(id);

const createTask = (id, newTask) => tasksRepo.createTask(id, newTask);

const getTaskById = id => tasksRepo.getTaskById(id);

const clearTaskByUserId = id => tasksRepo.clearTaskByUserId(id);

const updateTask = (params, updateInfo) =>
  tasksRepo.updateTask(params, updateInfo);

const deleteTask = task => tasksRepo.deleteTask(task);

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
