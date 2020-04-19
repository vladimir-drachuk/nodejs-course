const router = require('express').Router();
const boardsService = require('./boards.service');
const tasksService = require('../tasks/tasks.service');
const { errorHandler } = require('../../common/error-handler');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    await res.json(boards); //
  })
  .post(async (req, res) => {
    if (!req.body.title || !req.body.columns) {
      errorHandler(res, BAD_REQUEST, 'Bad request');
      return;
    }
    const board = await boardsService.createBoard(req.body);
    await res.json(board); //
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      await res.json(board); //
    } else {
      errorHandler(res, NOT_FOUND, 'no boards with this ID');
    }
  })
  .put(async (req, res) => {
    const user = await boardsService.getBoard(req.params.id);
    if (user) {
      await res.json(boardsService.updateBoard(user, req.body));
    } else {
      errorHandler(res, NOT_FOUND, 'no boards with this ID');
    }
  })
  .delete(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      await boardsService.deleteBoard(req.params.id);
      await res.json('The user has been deleted'); //
    } else {
      errorHandler(res, NOT_FOUND, 'no board with this ID');
    }
  });

router
  .route('/:id/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllById(req.params.id);
    await res.json(tasks); //
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
    await res.json(task);
  });

router
  .route('/:id/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.taskId);
    if (task) {
      await res.json(task); //
    } else {
      errorHandler(res, NOT_FOUND, 'no tasks with this ID');
    }
  })
  .put(async (req, res) => {
    const updatedTask = await tasksService.updateTask(req.params, req.body);
    await res.json(updatedTask); //
  })
  .delete(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.taskId);
    if (task) {
      await tasksService.deleteTask(req.params.taskId);
      await res.json('The task has been deleted'); //
    } else {
      errorHandler(res, NOT_FOUND, 'no tasks with this ID');
    }
  });

module.exports = router;
