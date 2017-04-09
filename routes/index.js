const express = require('express')
const router = express.Router()

// find user
router.get('/', (req, res) => {
  res.render('index', {title: 'folie.js'})
})

module.exports = router



