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
    const boards = await boardsService.createBoard(req.body);
    res.json(boards);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params);
    res.json(board);
  })
  .put(async (req, res) => {
    const user = await boardsService.getBoard(req.params);
    res.json(boardsService.updateBoard(user, req.body));
  })
  .delete(async (req, res) => {
    const board = await boardsService.getBoard(req.params);
    const boards = await boardsService.getAll();
    boardsService.deleteBoard(board, boards);
    res.json('The user has been deleted');
  });

router.route('/:id/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAllById(req.params);
  console.log(tasks);
  res.json(tasks);
});

module.exports = router;
