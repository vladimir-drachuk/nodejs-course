const tasksRepo = require('./tasks.memory.repository');

const getAll = () => tasksRepo.getAll();

const getAllById = params => {
  getAll().then(tasks => tasks.filter(task => task.id === params.id));
};

module.exports = { getAllById };
