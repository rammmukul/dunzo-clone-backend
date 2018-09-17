const http = require('./server')
const io = require('socket.io')(http)
const JWT = require('jsonwebtoken')
const { privateKey } = require('./secrets/jwtPrivateKey')
const haversine = require('haversine')
const Runners = require('./api/models/runners')
const Orders = require('./api/models/orders')

const runnerPos = {}
const messages = {}

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

  if (user.type === 'user') {
    let runnerAssigned
    socket.on('position request', async (order) => {
      runnerAssigned = (await Orders.findOne({_id: order, status: 'assigned'}).populate('runner')).runner
      const runnerPosition = runnerPos[runnerAssigned.emailID] ? runnerPos[runnerAssigned.emailID].pos : null
      runnerPos[runnerAssigned.emailID] = {...runnerPos[runnerAssigned.emailID], socket}
      socket.emit('runner position', runnerPosition)
    })

    socket.on('join chat room', async (orderID) => {
      runnerAssigned = (await Orders.findOne({_id: orderID, status: 'assigned'}).populate('runner')).runner
      socket.join(runnerAssigned.email + orderID)
      messages[runnerAssigned.email + orderID] = [
        ...messages[runnerAssigned.email + orderID] || []
      ]
      socket.emit('past messages', messages[runnerAssigned.email + orderID])
    })

    socket.on('chat message', async ([orderID, message]) => {
      const msgObj = {from: 'runner', message}
      socket.to(runnerAssigned.email + orderID).emit('chat message', msgObj)
      messages[runnerAssigned.email + orderID].push(msgObj)
    })
  } else {
    socket.on('position update', async (pos) => {
      if (
        !runnerPos[user.email] ||
        !haversine(runnerPos[user.email].pos, pos, {unit: 'meter', format: '[lon,lat]', threshold: 10})
      ) {
        runnerPos[user.email] = {...runnerPos[user.email], pos}
        await Runners.findOneAndUpdate({emailID: user.email}, {location: {coordinates: pos}})
      }

      const sendPosTo = runnerPos[user.email].socket
      if (sendPosTo) sendPosTo.emit('runner position', pos)
    })

    socket.on('join chat room', async (orderID) => {
      socket.join(user.email + orderID)
      messages[user.email + orderID] = [
        ...messages[user.email + orderID] || []
      ]
      socket.emit('past messages', messages[user.email + orderID])
    })

    socket.on('chat message', async ([orderID, message]) => {
      const msgObj = {from: 'user', message}
      socket.to(user.email + orderID).emit('chat message', msgObj)
      messages[user.email + orderID].push(msgObj)
    })
  }

  socket.on('disconnect', () => console.log('no more'))
})

io.origins('*:*')
