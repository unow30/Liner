const express = require('express')
const router = express.Router()
const { setting } = require('../controllers')

router.post('/highlights', setting.highlights)

module.exports = router