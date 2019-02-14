const five = require("johnny-five")

five.Board({ repl: false }).on("ready", function() {
  const touch = new five.Button(4)
  this.pinMode(1, this.MODES.OUTPUT) //relay pin

  touch.on("press", function() {
    this.digitalWrite(1, this.pins[1].value = 1)
    console.log("Botão Pressionado!")
  })
  touch.on("release", function() {
    this.digitalWrite(1, this.pins[1].value = 0)
    console.log("Released!")
  })
  touch.on("hold", function() {
    console.log("Holding...")
  })
})

