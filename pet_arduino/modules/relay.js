const five = require("johnny-five")
const board = new five.Board({repl: false})

board.on("ready", function() {
    console.log('1 start')
    this.digitalRead(9, function(value) {
        console.log('Value Relay: ',value)
    })
    //Set the mode of a specific pin, one of INPUT, OUTPUT, ANALOG, PWM, SERVO. Mode constants are exposed via the Pin class
    this.pinMode(13, this.MODES.OUTPUT)

    // Turn it on...
    this.digitalWrite(13, 1)
      
    this.wait(100, function() {
        // Turn it off...
        this.digitalWrite(13, 0)
        console.log('ok')
    })

//    setTimeout(function(){
//        console.log('abriu')    
//        // Whatever the last value was, write the opposite
//        this.digitalWrite(1, this.pins[1].value ? 0 : 1)
//    }, 200)
})
