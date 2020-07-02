const userModel = require('../model/user')
const passwordUtils = require('../utils/password')

module.exports = {

  async index (req, res) {
    try {
      const users = await userModel.find({})
      return res.json(users)
    } catch (error) {
      return res.json(error)
    }
  },

  async store (req, res) {
    try {
      const { username, email } = req.body
      let { password } = req.body

      let user = await userModel.findOne({ email })

      if (user) {
        return res.status(400).json({ error: 'E-mail já cadastrado' })
      }

      password = await passwordUtils.generateHash(password)

      user = await userModel.create({
        username,
        email,
        password
      })

      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.json(error)
    }
  },

  async update (req, res) {
  },

  async destroy (req, res) {
    const { _id } = req.params

    const user = await userModel.findByIdAndDelete({ _id })
    return res.json(user)
  }
}
