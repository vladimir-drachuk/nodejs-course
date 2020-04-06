const tasksRepo = require('./tasks.memory.repository');
const Task = require('../tasks/tasks.model');

const getAll = () => tasksRepo.getAll();

const getAllById = params =>
  getAll().then(tasks => tasks.filter(task => task.boardId === params.id));

const createTask = (params, newTask) => {
  const task = new Task(Object.assign(newTask, { boardId: params.id }));
  getAll().then(tasks => tasks.push(task));
  return task;
};

const getTaskById = params =>
  getAll().then(tasks => tasks.find(task => task.id === params.taskId));

const clearTaskByUserId = taskId =>
  getAll().then(tasks => {
    const tasksClear = tasks.filter(task => task.userId === taskId);
    tasksClear.forEach(item => {
      item.userId = null;
    });
  });

const updateTask = (task, updateInfo, params) => {
  const updatedTask = Object.assign(task, updateInfo, {
    boardId: params.id,
    id: params.taskId
  });
  return updatedTask;
};

const deleteTask = task => {
  getAll().then(tasks => tasks.splice(tasks.indexOf(task), 1));
};

const deleteTaskByBoard = boardId => {
  getAll().then(tasks => {
    const deletedTask = tasks.filter(task => task.boardId === boardId);
    deletedTask.forEach(task => {
      tasks.splice(tasks.indexOf(task), 1);
    });
  });
};

module.exports = {
  getAllById,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  clearTaskByUserId,
  deleteTaskByBoard
};
