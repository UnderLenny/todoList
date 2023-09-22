const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todo: {
    type: String, 
    required: [true, 'A task must have a name']
  },
  status: {
    type: String, 
    required: [true, 'A task must have a status'],
    enum: {
      values: ['Complete', 'Todo']
    },
    default: 'Todo'
  }
})
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;