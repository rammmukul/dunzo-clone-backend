const app = require('./app')
const http = require('http').Server(app)

http.listen(8000, () => console.log('listening on port 8000'))

module.exports = http

require('./socketServer')
