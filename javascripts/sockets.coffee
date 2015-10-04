createSockets = (http) ->
  io = require('socket.io')(http)
  io.on 'connection', (sock) ->
    console.log 'connection made'
    sock.on 'gamepadUpdate', (msg) ->
      console.log 'GamePad Pressed -> ' + msg

module.exports = {websockets: createSockets}
