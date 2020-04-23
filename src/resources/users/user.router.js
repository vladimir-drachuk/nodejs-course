const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { errorHandler } = require('../../common/error-handler');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    if (!req.body.name || !req.body.login || !req.body.password) {
      errorHandler(res, BAD_REQUEST, 'Bad request');
      return;
    }
    const user = await usersService.createUser(req.body);
    usersService.isPasswordTrue(user.password);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      await res.json(User.toResponse(user));
    } else {
      errorHandler(res, NOT_FOUND, 'no users with this ID');
    }
  })
  .put(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      res.json(User.toResponse(updatedUser));
    } else {
      errorHandler(res, NOT_FOUND, 'no users with this ID');
    }
  })
  .delete(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      await usersService.deleteUser(req.params.id);
      res.json('The user has been deleted');
    } else {
      errorHandler(res, NOT_FOUND, 'no users with this ID');
    }
  });

module.exports = router;
