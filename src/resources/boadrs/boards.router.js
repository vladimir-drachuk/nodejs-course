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
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).json('no boards');
    }
  })
  .put(async (req, res) => {
    const user = await boardsService.getBoard(req.params.id);
    res.json(boardsService.updateBoard(user, req.body));
  })
  .delete(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      boardsService.deleteBoard(board);
      res.json('The user has been deleted');
    } else {
      res.status(404).json('no board with this id');
    }
  });

router
  .route('/:id/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllById(req.params.id);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = await tasksService.createTask(req.params.id, req.body);
    res.json(task);
  });

router
  .route('/:id/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json('no tasks');
    }
  })
  .put(async (req, res) => {
    const updatedTask = await tasksService.updateTask(req.params, req.body);
    res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.taskId);
    tasksService.deleteTask(task);
    res.json('The task has been deleted');
  });

module.exports = router;
