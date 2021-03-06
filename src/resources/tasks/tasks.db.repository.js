const Task = require('../tasks/tasks.model');

const getAll = () => Task.find({});

const getAllById = id => Task.find({ boardId: id });

const createTask = async (id, newTask) => {
  const task = await Task.create(Object.assign(newTask, { boardId: id }));
  task.id = task._id;
  await task.save();
  return task;
};

const getTaskById = id => Task.findOne({ id });

const clearTaskByUserId = userId =>
  Task.updateMany({ userId }, { userId: null });

const updateTask = async (params, updateInfo) =>
  Task.updateOne(
    { id: params.taskId },
    Object.assign(updateInfo, {
      boardId: params.id,
      id: params.taskId
    })
  ).exec();

const deleteTask = id => Task.deleteOne({ id });

const deleteTaskByBoard = boardId => Task.deleteMany({ boardId });

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
