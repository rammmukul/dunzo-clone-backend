const http = require('./server')
const io = require('socket.io')(http)
const JWT = require('jsonwebtoken')
const { privateKey } = require('./secrets/jwtPrivateKey')
const haversine = require('haversine')
const Runners = require('./api/models/runners')

const runnerPos = {}

io.on('connection', async function (socket) {
  let user
  {
    const jwt = socket.request.headers.cookie.split(';')
      .map(e => e.trim())
      .filter(e => e.startsWith('access_token='))[0]
      .substring(13)
    user = await JWT.verify(jwt, privateKey)
  }
  console.log('a user connected', user)

  socket.on('position update', (pos) => {
    if (
      !runnerPos[user.email] ||
      !haversine(runnerPos[user.email], pos, {unit: 'meter', format: '[lon,lat]', threshold: 10})
    ) {
      runnerPos[user.email] = pos
      Runners.update({emailID: user.email}, {location: pos})
    }
  })
  socket.on('disconnect', () => console.log('no more'))
})

io.origins('*:*')
