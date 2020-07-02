const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  create_at: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('user', UserModel)
