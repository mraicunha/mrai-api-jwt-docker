const tokenModel = require('../model/token')

module.exports = {
  async index (req, res) {
    const tokens = await tokenModel.find({})
    return res.json(tokens)
  },
  async show (req, res) {
    const { user } = req.params
    const token = await tokenModel.findOne({ user })
    await token.populate('user').execPopulate()
    return res.json(token)
  }
}
