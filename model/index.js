const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/foile', err => console.log(err))

exports.User = mongoose.model('users', require('./user'))
