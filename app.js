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
const notificationsRoute = require('./api/routes/notifications')

const baseUrlFE = process.env.baseUrlFE

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', usersRoute)
app.use('/runner', runnersRoute)
app.use('/', notificationsRoute)

const homePageHandler = (req, res, next) => {
  let {baseUrl} = req
  if (res.locals.jwt) {
    if (baseUrl.startsWith('/runner')) {
      return res.redirect(baseUrlFE + '/runner.html')
    }
    return res.redirect(baseUrlFE + '/user.html#/placeorder')
  }
  if (baseUrl.startsWith('/runner')) {
    return res.redirect(baseUrlFE + '/runner.html#/login')
  }
  res.redirect(baseUrlFE + '/user.html#/login')
}
app.get('/', authenticate, homePageHandler)
app.use('/', express.static('public'))

mongoose.connect(process.env.mongoURL, { useNewUrlParser: true })

let db = mongoose.connection

db.on('open', () => { console.log('connected to dunzo clone db') })

module.exports = app
