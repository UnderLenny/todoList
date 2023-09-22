const express = require('express');
const todoController = require('./../controllers/todoController');

const router = express.Router();

router
  .route('/')
  .get(todoController.getTodo)
  .post(todoController.createTodo)


router
  .route('/delete/:id')
  .delete(todoController.deleteTodo)

router
  .route('/:id')
  .patch(todoController.changeStatus)
module.exports = router;