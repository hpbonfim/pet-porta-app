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
    port: '/dev/ttyACM0'
})
//---------------------------------------------//
app.use(cors()) // simple CORS Middleware
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

//handle ba requests
board.on("error", function(msg) {
  console.log("On Error: ", msg)
  process.exit(15)
})

console.log("Esperando o Arduino ligar...")
board.on("ready", function() {
  console.log('Arduino OK')
  let relay = new five.Relay({
    pin: 10, 
    type: "NC"
  })
  relay.off()
  app.use('/abrir', (req, res, next) => {
    relay.on() 
    setTimeout(() => {  
      relay.off()
      let time = (new Date()).toJSON()
      console.log("aberto em: ",time)
      res.json(time)
      next()
    }, 500)
  })
  app.listen(port, function() {
    console.log("Arduino port: ",port)
  })
})


//---------------------------------------------//