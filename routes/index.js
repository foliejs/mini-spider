const express = require('express')
const router = express.Router()

// find user
router.get('/', (req, res) => {
  res.render('index', {title: 'folie.js'})
})

router.get('/home', (req, res) => {
  res.send('hello world')
})

module.exports = router
