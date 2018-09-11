const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const { authenticate } = require('./middlewares/authenticate')

const usersRoute = require('./api/routes/users')
const runnersRoute = require('./api/routes/runners')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', usersRoute)
app.use('/runner', runnersRoute)

const homePageHandler = (req, res, next) => {
  if (res.locals.jwt) {
    return res.redirect('http://localhost:8000/user/placeorder')
  }
  res.redirect('http://localhost:8000/user/getLoginURL')
}
app.get('/', authenticate, homePageHandler)

mongoose.connect('mongodb://localhost:27017/dunzoClone', { useNewUrlParser: true })

let db = mongoose.connection

db.on('open', () => { console.log('connected to dunzo clone db') })

module.exports = app
