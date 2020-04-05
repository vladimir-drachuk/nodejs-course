// const Task = require('./tasks.model');

const tasks = [];

/* const task = new Task({
  title: 'Do housework',
  order: 1,
  description: 'Wash up, clean up',
  boardId: 'board ID'
});
tasks.push(task); */

const getAll = async () => tasks;

module.exports = { getAll };
