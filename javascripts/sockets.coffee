rover = require('./rover.coffee').motor
motor1 = new rover('m1', 12, 1, 1)
motor2 = new rover('m2',1,2,3,)

createSockets = (http) ->
  io = require('socket.io')(http)
  io.on 'connection', (sock) ->
    console.log 'connection made'
    sock.on 'gamepadUpdate', (msg) ->
      msg = msg.split('=')
      axis = parseFloat(msg[0])
      speed = parseFloat(msg[1])
      motor1.setSpeed(speed) if axis == 1
      motor2.setSpeed(speed) if axis == 3

      #console.log 'GamePad Pressed -> ' + msg

module.exports = {websockets: createSockets}
