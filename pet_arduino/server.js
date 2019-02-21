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
        reject('Aconteceu um erro')
        process.exit()
      }
    }, 5000)
  })
}
connectar().then(console.log('OK')).catch(err => console.log("ERRO DO CARALHO::::",err))

//---------------------------------------------//
function arduino() { 
  return new Promise((resolve, reject) => {
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
        console.log('ok')
              
        // app.use('/piscar', (req, res) => {
        //   rgb.color(255,0,0)
        //   board.wait(1000, ()=>{
        //     rgb.color('green')
        //     board.wait(1000, ()=>{
        //       rgb.color('#0000ff')
        //     })
        //   })   
        //     setTimeout(() => {rgb.off(), resolve(), res.sendStatus(200)}, 3000)
        // })
          
//--------------------------------------------- Button config
/*          touch.on("press", function() {
            relay.on()
            setTimeout(() => { relay.off() }, 500)
            var time = new Date()
            console.log("Botão Pressionado!", time)
          })
            
          touch.on("release", function() {
              relay.off()
            console.log("Botão Solto!")
          })
          
          touch.on("hold", function() {
            relay.off()
            console.log("Segurando...")
          })
*/
      //---------------------------------------------
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

