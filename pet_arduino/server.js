// Basic Global Config
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const port = 3003
const app = express()
const http = require('http')
const songs = require('j5-songs')
const five = require("johnny-five")
const server = http.createServer(app)
const EtherPort = require("etherport")
let board, error

//---------------------------------------------//
app.use(cors()) // simple CORS Middleware
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

//---------------------------------------------//
// app.use((req, res, next) => {
//   const error = new Error("Not found")
//   error.status = 404
//   console.log(error)
//   next(error)
// })
// //---------------------------------------------//

// app.use((error, req, res, next) => {
//   res.status(error.status || 500)
//   console.log(error)
//   res.json({ error: { message: error.message  }})
// })
//---------------------------------------------//

//------------------------------------------ Arduino Modules
function connectar (){
  return new Promise((resolve, reject) => {
    board = new five.Board({repl: false /*port: new EtherPort(3030)*/})
    setTimeout(() => {
      error = false
      if(!error){
        resolve()
      } else {
        process.exit()
        reject('Aconteceu um erro, verifique o arduíno')
      }
    }, 5000)
  })
}
connectar().then(console.log('OK')).catch(err => console.log("ERRO DO CARALHO::::", err))

//---------------------------------------------//
function arduino() { 
  return new Promise((resolve, reject) => {
    try{
      board.on('ready',() => {
        let relay = new five.Relay({ pin: 10, type: "NC" })
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
        console.log('Arduino pronto!')
      })
    } catch(error){
      reject('Aconteceu um erro')
      process.exit()
    }
    if(!error){
      resolve()
    } 
  })
}
arduino().then('OK').catch(err => console.log("ERRO DO CARALHO::::", err))


//---------------------------------------------//
server.listen(port, function() {
console.log("Arduino port: ",port)
})
//---------------------------------------------//

