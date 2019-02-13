const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const EtherPort = require("etherport")
const five = require('johnny-five')
const songs = require('j5-songs')
const board = new five.Board({ repl: false })//port: new EtherPort(3030)
let buzzer, melody
var relay

 // CORS Middleware
app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(express.static(__dirname))
//Test
board.on("ready", function() {
  buzzer = new five.Piezo({
    type: 'NC',
    pin: 4
  })
  melody = songs.load("mario-intro")
  console.log('play:', melody)
  buzzer.play(melody)

app.get('/test',(req, res) => {
  console.log('Online')
  board.on("ready", function() {
    buzzer = new five.Piezo({
      type: 'NC',
      pin: 4
    })
    melody = songs.load("mario-intro")
    console.log('play:', melody)
    buzzer.play(melody)
  })
  res.sendStatus(200)
})

app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString()
  res.status(404).send(`Hora: ${time}`)
})

app.get('/abrir',(req, res) => {
  global.off()  
  setTimeout(function(){
    console.log('abriu')    
    global.on()
      }, 1000)
  res.sendStatus(200)
})

app.get('/on', function(req, res) {
  board.on('ready', function() {
    var relay = new five.Relay({
      type: 'NC',
      pin: 13
    })
    board.repl.inject({
      relay: relay
    })
    relay.toggle()
  })    
  res.sendStatus(200)
})

// ------------------------------------------------------------

app.listen(port, function() {
  console.log("Arduino port: ",port);
})

// ----------------------------------------------------