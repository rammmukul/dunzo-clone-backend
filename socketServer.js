const http = require('./server')
const io = require('socket.io')(http)

io.on('connection', function (socket) {
  const jwt = socket.request.headers.cookie.split(';')
    .map(e => e.trim())
    .filter(e => e.startsWith('access_token='))[0]
    .substring(13)
  socket.on('disconnect', () => console.log('no more'))
})

io.origins('*:*')
