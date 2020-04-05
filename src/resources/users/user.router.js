const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const taskService = require('../tasks/tasks.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params);
    if (user) {
      await res.json(User.toResponse(user));
    } else {
      res.status(404).json('Not found');
    }
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params);
    if (user) {
      res.json(User.toResponse(usersService.updateUser(user, req.body)));
    } else {
      res.status(200).json('There are no users with this ID');
    }
  })
  .delete(async (req, res) => {
    const user = await usersService.getUser(req.params);
    const users = await usersService.getAll();
    taskService.clearTaskByUserId(req.params.id);
    usersService.deleteUser(user, users);
    res.json('The user has been deleted');
  });

module.exports = router;
