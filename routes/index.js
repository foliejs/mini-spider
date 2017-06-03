const express = require('express')
const router = express.Router()

// find user
router.get('/', (req, res) => {
  console.log('唐家成')
  res.render('index', {title: 'folie.js'})
})

router.get('/home', (req, res) => {
  console.log('唐家成123')
  res.send('hello tangjiacheng 123')
})

module.exports = router
