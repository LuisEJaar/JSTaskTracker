const mongoose = require('mongoose')

const RewardSchema = new mongoose.Schema({
  reward: {
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

module.exports = mongoose.model('Todo', RewardSchema)
