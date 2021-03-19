const express = require('express')
const router = express.Router()
const { user } = require('../controllers')

router.post('/login', user.login)
router.post('/logout', user.logout)
router.post('/signup', user.signup)


module.exports = router