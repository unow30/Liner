const express = require('express')
const router = express.Router()
const { highlight } = require("../controllers")

router.post('/create', highlight.create)
router.post('/update/:highlightId', highlight.update)
router.post('/delete/:highlightId', highlight.delete)

module.exports = router