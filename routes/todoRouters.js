const express = require('express');
const todoController = require('./../controllers/todoController');

const router = express.Router();

router
  .route('/')
  .get(todoController.getTodo)
  .post(todoController.createTodo)

router
  .route('/:_id')
  .delete(todoController.deleteTodo)
  .patch((req, res) => {
    if (req.body.status) {
      return todoController.changeStatus(req, res);
    } else {
      return todoController.changeTaskName(req, res);
    }
  })
module.exports = router;