const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users') 

router.put('/changeTotal', usersController.changeTotal)

module.exports = router