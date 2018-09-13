const http = require('./server')
const io = require('socket.io')(http)
const JWT = require('jsonwebtoken')
const { privateKey } = require('./secrets/jwtPrivateKey')
const haversine = require('haversine')
const Runners = require('./api/models/runners')
const Orders = require('./api/models/orders')

const runnerPos = {}

io.on('connection', async function (socket) {
  let user
  try {
    const jwt = socket.request.headers.cookie.split(';')
      .map(e => e.trim())
      .filter(e => e.startsWith('access_token='))[0]
      .substring(13)
    user = await JWT.verify(jwt, privateKey)
  } catch (e) {
    console.log('somthing wrong with jwt', e)
  }

  socket.on('position update', async (pos) => {
    if (
      !runnerPos[user.email] ||
      !haversine(runnerPos[user.email].pos, pos, {unit: 'meter', format: '[lon,lat]', threshold: 10})
    ) {
      runnerPos[user.email] = {...runnerPos[user.email], pos}
      await Runners.update({emailID: user.email}, {location: {coordinates: pos}})
    }
    const sendPosTo = runnerPos[user.email].socket
    if (sendPosTo) sendPosTo.emit('runner position', pos)
  })

  socket.on('position request', async (order) => {
    const runnerAssigned = (await Orders.findOne({_id: order, status: 'assigned'}).populate('runner')).runner
    const runnerPosition = runnerPos[runnerAssigned.emailID] ? runnerPos[runnerAssigned.emailID].pos : null
    runnerPos[runnerAssigned.emailID] = {...runnerPos[runnerAssigned.emailID], socket}
    socket.emit('runner position', runnerPosition)
  })

  socket.on('disconnect', () => console.log('no more'))
})

io.origins('*:*')
