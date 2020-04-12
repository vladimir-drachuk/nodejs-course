const router = require('express').Router();
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');
const { errorHandler } = require('../../common/error-handler');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    if (!req.body.title || !req.body.columns) {
      errorHandler(res, BAD_REQUEST, 'Bad request');
      return;
    }
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
      errorHandler(res, NOT_FOUND, 'no boards with this ID');
    }
  })
  .put(async (req, res) => {
    const user = await boardsService.getBoard(req.params.id);
    if (user) {
      res.json(boardsService.updateBoard(user, req.body));
    } else {
      errorHandler(res, NOT_FOUND, 'no boards with this ID');
    }
  })
  .delete(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      boardsService.deleteBoard(board);
      res.json('The user has been deleted');
    } else {
      errorHandler(res, NOT_FOUND, 'no board with this ID');
    }
  });

router
  .route('/:id/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllById(req.params.id);
    res.json(tasks);
  })
  .post(async (req, res) => {
    if (
      !req.body.title ||
      req.body.order === undefined ||
      !req.body.description ||
      req.body.userId === undefined ||
      req.body.boardId === undefined
    ) {
      errorHandler(res, BAD_REQUEST, 'Bad request');
      return;
    }
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
      errorHandler(res, NOT_FOUND, 'no tasks with this ID');
    }
  })
  .put(async (req, res) => {
    const updatedTask = await tasksService.updateTask(req.params, req.body);
    res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.taskId);
    if (task) {
      tasksService.deleteTask(task);
      res.json('The task has been deleted');
    } else {
      errorHandler(res, NOT_FOUND, 'no tasks with this ID');
    }
  });

module.exports = router;
