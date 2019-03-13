// Basic Global Config
const bodyParser = require('body-parser')
const port = process.env.ARDUINO_PORT
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
var five = require('johnny-five')
// var board = new five.Board({repl: false /*port: new EtherPort(3030)*/})
//console.log(five.Board({repl: false}).on('ready', function() {}))
var board = five.Board({
    repl: false,
    port: "/dev/ttyACM0"
//port: new EtherPort(3030),
})
//---------------------------------------------//
app.use(cors()) // simple CORS Middleware
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

// Routes to handle requests
board.on("error", function(msg) {
    console.log("On Error: ", msg)
  //  process.exit(15)
  app.use('/abrir', (req, res, next) => {
    res.json(msg)
    next()
  })
})

board.on("ready", function() {
  let relay = new five.Relay({ pin: 8, type: 'NC' })
  app.use('/abrir', (req, res, next) => {
    let time = (new Date()).toJSON()
    console.log("ready")
    relay.off()
    setTimeout(() => { relay.on() }, 1500)
    relay.off()
    console.log("aberto em: ",time)
    res.json(time)
    next()
  })
})


app.listen(port, function() {
  console.log("Arduino port: ",port)
})
//---------------------------------------------//