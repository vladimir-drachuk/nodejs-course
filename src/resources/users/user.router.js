const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const users = await usersService.createUser(req.body);
    res.json(users.map(User.toResponse));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params);
    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params);
    res.json(User.toResponse(usersService.updateUser(user, req.body)));
  })
  .delete(async (req, res) => {
    const user = await usersService.getUser(req.params);
    const users = await usersService.getAll();
    usersService.deleteUser(user, users);
    res.json('The user has been deleted');
  });

module.exports = router;
