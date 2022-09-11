const express = require('express')
const router = express.Router()
const rewardsController = require('../controllers/rewards') 

router.post('/createReward', rewardsController.createReward)

router.put('/markComplete', rewardsController.markComplete)

router.put('/markIncomplete', rewardsController.markIncomplete)

router.delete('/deleteReward', rewardsController.deleteReward)

module.exports = router