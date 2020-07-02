const mongoose = require('mongoose')

const tokenModel = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  create_at: { type: Date, default: Date.now() },
  expire: { type: Date, default: Date.now() + (1000 * 60 * 60) }

}, {
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('token', tokenModel)
