const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userData = new Schema({
  _userId: Schema.ObjectId,
  name: String,
  password: String
})

module.exports = userData