const Task = require('../tasks/tasks.model');

const tasks = [];

const getAll = async () => tasks;

const getAllById = id =>
  getAll().then(taskList => taskList.filter(task => task.boardId === id));

const createTask = (id, newTask) => {
  const task = new Task(Object.assign(newTask, { boardId: id }));
  getAll().then(taskList => taskList.push(task));
  return task;
};

const getTaskById = id =>
  getAll().then(taskList => taskList.find(task => task.id === id));

const clearTaskByUserId = id =>
  getAll().then(taskList => {
    const tasksClear = taskList.filter(task => task.userId === id);
    tasksClear.forEach(item => {
      item.userId = null;
    });
  });

const updateTask = async (params, updateInfo) => {
  const task = await getTaskById(params.taskId);
  const updatedTask = Object.assign(task, updateInfo, {
    boardId: params.id,
    id: params.taskId
  });
  return updatedTask;
};

const deleteTask = task => {
  getAll().then(taskList => taskList.splice(tasks.indexOf(task), 1));
};

const deleteTaskByBoard = boardId => {
  getAll().then(taskList => {
    const deletedTask = taskList.filter(task => task.boardId === boardId);
    deletedTask.forEach(task => {
      taskList.splice(tasks.indexOf(task), 1);
    });
  });
};

module.exports = {
  getAll,
  getAllById,
  createTask,
  getTaskById,
  clearTaskByUserId,
  updateTask,
  deleteTask,
  deleteTaskByBoard
};
