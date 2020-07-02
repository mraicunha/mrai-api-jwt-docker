const express = require('express')
const { Strategy, ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const routes = express.Router()

const { authSecret } = require('./.env')
const userModel = require('./model/user')

const userController = require('./controller/userControlle')
const sessionController = require('./controller/sessionController')
const tokenController = require('./controller/tokenController')

routes.get('/', (req, res) => {
  return res.json({ msg: 'Hello World' })
})

routes.post('/session', sessionController.store)

routes.get('/tokens', tokenController.index)
routes.get('/tokens/:user', tokenController.show)

routes.get('/users', passport.authenticate('jwt', { session: false }), userController.index)
routes.post('/users', passport.authenticate('jwt', { session: false }), userController.store)
routes.put('/users', passport.authenticate('jwt', { session: false }), userController.update)
routes.delete('/users/:_id', passport.authenticate('jwt', { session: false }), userController.destroy)

const params = {
  secretOrKey: authSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new Strategy(params, function (jwtPayload, done) {
  async function validateJwt (payload) {
    try {
      const user = await userModel.findById({ _id: payload.id })
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(null, false)
    }
  }
  if (jwtPayload.expiresIn >= Date.now()) {
    validateJwt(jwtPayload)
  } else {
    return done(null, false)
  }
}))

module.exports = routes
