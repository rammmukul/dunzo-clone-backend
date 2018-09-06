const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const { authenticate } = require('./middlewares/authenticate')
const { serveAppropriatePage } = require('./api/controllers/users')

const usersRoute = require('./api/routes/users')
const runnersRoute = require('./api/routes/runners')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

const homePageHandler = (req, res, next) => serveAppropriatePage(req, res, next)

app.get('/', authenticate, homePageHandler)

app.use('/user', usersRoute)
app.use('/runner', runnersRoute)

// app.use('/', authenticate,
//   handleHomePageRequest,
//   express.static(path.join(__dirname, 'views', 'login')))

mongoose.connect('mongodb://localhost:27017/dunzoClone', { useNewUrlParser: true })

let db = mongoose.connection

db.on('open', () => { console.log('connected to dunzo clone db') })

app.listen(8000, () => console.log('listening on port 8000'))
