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

const clearTaskByUserId = taskId =>
  getAll().then(tasks => {
    const tasksClear = tasks.filter(task => task.userId === taskId);
    tasksClear.forEach(item => {
      item.userId = null;
    });
  });

const updateTask = (task, updateInfo, params) => {
  console.log(task);
  const updatedTask = Object.assign(task, updateInfo, {
    boardId: params.id,
    id: params.taskId
  });
  console.log(updatedTask);
  return updatedTask;
};

const deleteTask = (task, taskList) => {
  taskList.splice(taskList.indexOf(task), 1);
};

module.exports = {
  getAllById,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  clearTaskByUserId
};
