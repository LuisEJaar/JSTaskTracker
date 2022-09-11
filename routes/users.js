const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users') 

router.put('/addToTotal', usersController.addToTotal)

module.exports = router