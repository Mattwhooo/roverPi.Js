Motor = (name, m1, m2, me) ->
    name: name
    motorE: me
    #io: require('onoff').Gpio
    #motor1A: self.io m1, 'high'
    #motor1B: self.io m2, 'low'
    motor1A: 'high'
    motor1B: 'low'

    motor1E: require 'pi-blaster.js'

    setSpeed: (speed) ->
        speed = 0.0 if speed < 0.1 and speed > -0.1
        if speed > 0
            #self.motor1A.setDirection('high')
            #self.motor1B.setDirection('low')
            this.motor1A = 'high'
            this.motor1B = 'low'
            this.motor1E.setPwm this.motorE_pin, speed
        else
            this.motor1A = 'low'
            this.motor1B = 'high'
            #self.motor1A.setDirection('low')
            #self.motor1B.setDirection('high')
            this.motor1E.setPwm this.motorE, speed
        console.log this.name + '-' + this.motor1A + '-' + this.motor1B + '-' + speed.toString()
module.exports =
    motor: Motor


