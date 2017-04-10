const express = require('express')
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')

router.get('/doc', (req, res) => {
  let options = {
    swaggerDefinition: {
      info: {
        title: 'cute boy',
        version: '1.0.0',
      },
    },
    apis: ['./users.js']
  }
  let swaggerSpec = swaggerJSDoc(options)
  res.send(swaggerSpec)
})

module.exports = router
