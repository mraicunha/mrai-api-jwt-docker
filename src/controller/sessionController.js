const jwt = require('jwt-simple')

const userModel = require('../model/user')
const tokenModel = require('../model/token')

const { authSecret } = require('../.env')
const { compareHash } = require('../utils/password')

module.exports = {
  async store (req, res) {
    try {
      const { email, password } = req.body

      const user = await userModel.findOne({ email })

      if (!user) {
        return res.status(401).json({ error: 'Usuário ou senha incorretos' })
      }

      const match = await compareHash(password, user.password)
      console.log(match)

      if (!match) {
        return res.status(401).json({ error: 'Usuário ou senha incorretos' })
      }

      const newToken = jwt
        .encode({ id: user.id, expiresIn: Date.now() + (1000 * 60 * 60) }, authSecret)

      const token = await tokenModel.create({
        token: newToken,
        user: user._id
      })
      return res.json({ user, token: token.token })
    } catch (error) {
      return res.json(error)
    }
  }
}
