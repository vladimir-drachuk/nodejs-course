const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { errorHandler } = require('../../common/error-handler');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse)); //
  })
  .post(async (req, res) => {
    if (!req.body.name || !req.body.login || !req.body.password) {
      errorHandler(res, BAD_REQUEST, 'Bad request');
      return;
    }
    const user = await usersService.createUser(req.body);
    await res.json(User.toResponse(user)); //
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
      await res.json(
        User.toResponse(usersService.updateUser(req.params.id, req.body)) //
      );
    } else {
      errorHandler(res, NOT_FOUND, 'no users with this ID');
    }
  })
  .delete(async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      await usersService.deleteUser(req.params.id);
      await res.json('The user has been deleted'); //
    } else {
      errorHandler(res, NOT_FOUND, 'no users with this ID');
    }
  });

module.exports = router;
