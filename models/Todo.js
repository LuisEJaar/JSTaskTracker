const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }, 
  points: {
    type: Number,
    required: true
  }, 
  reoccuring: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
