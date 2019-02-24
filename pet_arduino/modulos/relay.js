const five = require("johnny-five")
const board = new five.Board({repl: false})

board.on("ready", function() {
    var relay = new five.Relay({
        pin: 11, 
        type: "NC"
    })
    setTimeout(() => {
        relay.off()
    }, 500)
//     //Set the mode of a specific pin, one of INPUT, OUTPUT, ANALOG, PWM, SERVO. Mode constants are exposed via the Pin class
//     setTimeout(function(){
//         relay.on()
//         console.log('abriu')    
//        // Whatever the last value was, write the opposite
//    }, 400)
   
//    this.loop(500, () => {
//         relay.off()
//     })
})
