// Basic Global Config
const bodyParser = require('body-parser')
const port = process.env.ARDUINO_PORT
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const songs = require('j5-songs')
const five = require("johnny-five")
const server = http.createServer(app)
const EtherPort = require("etherport")
let board, error
board = new five.Board({repl: false/*port: new EtherPort(3030)*/})

//---------------------------------------------//
app.use(cors()) // simple CORS Middleware
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

//------------------------------------------ Arduino Modules
function arduino() { 
  return new Promise((resolve, reject) => {
      board.on('ready',() => {
        let relay = new five.Relay({ pin: 6, type: "NC" })
        relay.off()
        // let touch = new five.Button({ pin: 9, holdtime: 5000 })

        app.use('/abrir', (req, res, next) => {
          relay.on()
          var tempo = new Date()
          setTimeout(() => { relay.off() }, 1000)
          console.log("Aberto em: ",tempo)
          res.sendStatus(200)
          resolve()
          next()
        })
        console.log('ok')
      })
      if(!error){
        resolve()
      } else {
        reject('Aconteceu um erro')
      }
  })
}
arduino().then('OK').catch(err => console.log("ERRO DO CARALHO::::",err))


//---------------------------------------------//
server.listen(port, function() {
console.log("Arduino port: ",port)
})
//---------------------------------------------//

