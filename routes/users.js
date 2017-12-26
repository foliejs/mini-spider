const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     description: find user
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: find success
 */
router.get('/', (req, res) => {
  db.User
    .find({})
    .then((result) => res.send(result))
    .catch(err => res.send(500, err))
})

/**
 * @swagger
 * /:
 *   post:
 *     description: create user
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *
 */
router.post('/', (req, res) => {
  let userModel = {
    name: 'cute-body',
    password: 'ctf'
  }
  let user = new db.User(userModel)
  user
    .save()
    .then(result => res.send(result))
    .catch(err => res.send(500, err))
})

/**
 * @swagger
 * /:
 *   put:
 *     description: modify user
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 */
router.put('/', (req, res) => {
  db.User
    .update({name: 'cute-body'}, {
      '$set': {
        password: '123'
      }
    })
    .exec()
    .then(result => res.send(result))
    .catch(err => res.send(500, err))
})

/**
 * @swagger
 * /:
 *   delete:
 *     description: delete user
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: delete success
 */
router.delete('/', (req, res) => {
  db.User
    .remove({name: 'cute-body'})
    .exec()
    .then(result => res.send(result))
    .catch(err => res.send(500, err))
})

module.exports = router
