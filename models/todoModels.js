const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todo: {
    type: String, 
    required: [true, 'A task must have a name']
  },
  // done: {
  //   type: boolean, 
  //   required: [false, 'A task must have a status']
  // }
})
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;