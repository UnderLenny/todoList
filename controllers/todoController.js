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

exports.deleteTodo = async (req, res) => { 
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params._id);

    if (!deletedTodo) {
      return res.status(404).json({
        status: 'fail',
        message: 'Todo not found',
      });
    }

    res.status(204).json({
      status: 'success',
      todo: deletedTodo,
    });
    
  } catch(err) {
    console.log(err);
  }
}

exports.changeStatus = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Проверяем, что taskId не равно undefined или пустой строке
    if (!taskId) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const todo = await Todo.findById(taskId);

    // Изменяем статус задачи
    if (todo.status === 'Todo') {
      todo.status = 'Complete';
    } else {
      todo.status = 'Todo';
    }

    // Сохраняем изменения в базе данных
    await todo.save();
   } catch(err) {
    console.log(err)
   }

}