import express from "express";
import * as todoController from "./../controllers/todoController";

const router = express.Router();

router.route("/").get(todoController.getTodo).post(todoController.createTodo);

router
  .route("/:_id")
  .delete(todoController.deleteTodo)
  .patch((req, res) => {
    if (req.body.status) {
      return todoController.changeStatus(req, res);
    }
    return todoController.changeTaskName(req, res);
  });
export default router;
