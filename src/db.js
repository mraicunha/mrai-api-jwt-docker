const mongoose = require('mongoose')

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useFindAndModify: false
}
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
// const url = `mongodb://localhost:${MONGO_PORT}/${MONGO_DB}`

mongoose.connect(url, options)
  .then(function () {
    console.log('MongoDB is connected')
  })
  .catch(function (err) {
    console.log(err)
  })
