const express = require('express')
const app = express()
const cors = require('cors')
const port = 3333;
const bodyParser = require('body-parser')
let setState
// var EthernetPort = require('etherport')
const five = require('johnny-five')
const board = new five.Board() // { port: new EthernetPort(3030) }

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
//Test
app.get('/', function (req, res){
  console.log('Online')
})
//Toogle
app.get('/toogle', function(req, res){
  setState.toogle()
  res.redirect('/')
})
//Piezo Teste
board.on("ready", function() {
  // Creates a piezo object and defines the pin to be used for the signal
  var piezo = new five.Piezo(3);

  // Injects the piezo into the repl
  board.repl.inject({
    piezo: piezo
  });

  // Plays a song
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
    tempo: 100
  });

  // Plays the same song with a string representation
  piezo.play({
    // song is composed by a string of notes
    // a default beat is set, and the default octave is used
    // any invalid note is read as "no note"
    song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
    beats: 1 / 4,
    tempo: 100
  });

});

// ------------------------------------------------------------
board.on('ready', function () {
  console.log('Arduino está pronto!')
  relay = new five.Relay({
    type: 'NC',
    pin: 10
  })
    setState = relay
})

// ----------------------------------------------------

app.listen(port)
console.log("Arduino port: ",port)