const express = require('express')
const app = express()
const passport = require('passport')
const db = require('./db')
const routes = require('./routes')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  next()
})

app.use(passport.initialize())
app.use(routes)
app.listen(port, function () {
  console.log(`listening on ${port}!`)
})
