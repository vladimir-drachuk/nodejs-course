const tasksRepo = require('./tasks.memory.repository');
const Task = require('../tasks/tasks.model');

const getAll = () => tasksRepo.getAll();

const getAllById = params =>
  getAll().then(tasks => tasks.filter(task => task.boardId === params.id));

const createTask = (params, newTask) =>
  getAll().then(tasks => {
    tasks.push(new Task(Object.assign(newTask, { boardId: params.id })));
    return tasks;
  });

const getTaskById = params =>
  getAll().then(tasks => tasks.find(task => task.id === params.taskId));

const updateTask = (params, updateInfo) =>
  Object.assign(getTaskById(params), updateInfo, {
    boardId: params.id,
    taskId: params.taskId
  });

const deleteTask = (task, taskList) => {
  taskList.splice(taskList.indexOf(task), 1);
};

module.exports = {
  getAllById,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
