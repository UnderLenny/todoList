const Todo = require("./../models/todoModels");

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("./index", { todos });
  } catch (err) {
    console.log(err)
  }
};

exports.createTodo = (req, res) => {
  try {
    const todo = new Todo({
      todo: req.body.todoValue,
    });
    todo.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};