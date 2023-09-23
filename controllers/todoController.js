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
    const taskId = req.params._id; // Замените "id" на "_id" для параметра

    if (!taskId) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const todo = await Todo.findById(taskId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Меняем статус задачи на противоположный
    todo.status = todo.status === 'Todo' ? 'Complete' : 'Todo';

    await todo.save();

    console.log(`Задача с ID ${taskId} успешно обновлена на статус: ${todo.status}`); // Добавляем логирование

    res.status(200).json({
      status: 'success',
      todo: {
        todo: todo.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task status' });
  }
};
