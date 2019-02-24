const five = require('johnny-five')
const board = new five.Board({repl: false})
const songs = require('j5-songs')

board.on("ready", function() {
  buzzer = new five.Piezo({
    type: 'NC',
    pin: 10
  })
  melody = songs.load('mario-intro')
  console.log('play:', melody)
  exports.buzzer.play(melody)
})