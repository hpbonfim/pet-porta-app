const five = require('johnny-five')
const board = new five.Board({repl: false})
const songs = require('j5-songs')

board.on("ready", function() {
  buzzer = new five.Piezo({
    type: 'NC',
    pin: 9
  })
  melody = songs.load('nyan-intro')
  console.log('play:', melody)
  buzzer.play(melody)
})
