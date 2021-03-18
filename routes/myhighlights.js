const express = require('express')
const router = express.Router()
const { myhighlights } = require('../controllers')

router.get('/highlights', myhighlights.highlights)
router.get('/pages', myhighlights.pages)

module.exports = router