const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const usersRoute = require('./api/routes/users')
const runnersRoute = require('./api/routes/runners')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', usersRoute)
app.use('/runner', runnersRoute)

mongoose.connect('mongodb://localhost:27017/dunzoClone', { useNewUrlParser: true })

let db = mongoose.connection

db.on('open', () => { console.log('connected to dunzo clone db') })

app.listen(8000, () => console.log('listening on port 8000'))
