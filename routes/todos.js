const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const rewardsController = require('../controllers/rewards') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

//Rewards

router.post('/createReward', rewardsController.createReward)

router.put('/markRedeemed', rewardsController.markRedeemed)

router.put('/markUnredeemed', rewardsController.markUnredeemed)

router.delete('/deleteReward', rewardsController.deleteReward)

module.exports = router