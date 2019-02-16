const five = require("johnny-five")
const board = new five.Board({repl: false})

const botao = board.on("ready", function() {
  const touch = new five.Button(9)
  rgb.blink()    
  relay.on()
  setTimeout(() => { relay.off() }, 500)
  melody = songs.load('mario-intro')
  buzzer.play(melody)
  console.log("Botão Pressionado!")
  setTimeout(() => { rgb.stop(), rgb.off()}, 1000)
  
  touch.on("release", function() {
    relay.off()
    console.log("Botão Livre!")
  })

  touch.on("hold", function() {
    relay.off()
    console.log("Pressionando...")
  })

})

module.exports = botao