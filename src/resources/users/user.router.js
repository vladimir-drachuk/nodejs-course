const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { errorHandler } = require('../../common/error-handler');

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
    const user = await usersService.getUser(req.params.id);
    if (user) {
      await res.json(User.toResponse(user));
    } else {
      errorHandler(res, 'no users with this ID');
    }
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.json(User.toResponse(usersService.updateUser(user, req.body)));
    } else {
      errorHandler(res, 'no users with this ID');
    }
  })
  .delete(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      usersService.deleteUser(req.params.id);
      res.json('The user has been deleted');
    } else {
      errorHandler(res, 'no users with this ID');
    }
  });

module.exports = router;
