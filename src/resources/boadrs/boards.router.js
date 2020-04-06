const router = require('express').Router();
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.json(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params);
    if (board) {
      res.json(board);
    } else {
      res.status(404).json('no boards');
    }
  })
  .put(async (req, res) => {
    const user = await boardsService.getBoard(req.params);
    res.json(boardsService.updateBoard(user, req.body));
  })
  .delete(async (req, res) => {
    const board = await boardsService.getBoard(req.params);
    const boards = await boardsService.getAll();
    boardsService.deleteBoard(board, boards);
    tasksService.deleteTaskByBoard(req.params.id);
    res.json('The user has been deleted');
  });

router
  .route('/:id/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllById(req.params);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = await tasksService.createTask(req.params, req.body);
    res.json(task);
  });

router
  .route('/:id/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTaskById(req.params);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json('no tasks');
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.getTaskById(req.params);
    const updatedTask = await tasksService.updateTask(
      task,
      req.body,
      req.params
    );
    res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const task = await tasksService.getTaskById(req.params);
    tasksService.deleteTask(task);
    res.json('The task has been deleted');
  });

module.exports = router;
