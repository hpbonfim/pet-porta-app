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
//------------------------------------------ Arduino Modules
function connectar (){
  return new Promise((resolve, reject) => {
    board = new five.Board({repl: false, debug: false /*port: new EtherPort(3030)*/})
    setTimeout(() => {
      error = false
      if(!error){
        resolve()
      } else {
        reject('Aconteceu um erro')
      }
    }, 5000)
  })
}
connectar().then(console.log('OK')).catch(err => console.log("ERRO DO CARALHO::::",err))
//---------------------------------------------//
app.use(cors()) // simple CORS Middleware
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(express.static(__dirname))
//---------------------------------------------//

app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString()
  res.status(200).send(`Hora: ${time}`)
})

//---------------------------------------------//
function arduino() { 
  return new Promise((resolve, reject) => {
      board.on('ready',() => {
        let relay = new five.Relay({ pin: 11, type: "NC" })
        let buzzer = new five.Piezo({ type: 'NC', pin: 10 })
        let touch = new five.Button({ pin: 9, holdtime: 5000 })
        let rgb = new five.Led.RGB([6, 5, 3])
        relay.off()
        
        app.get('/abrir', (req, res) => {
          relay.on()
          setTimeout(() => { relay.off() }, 500)
          melody = songs.load('mario-intro')
          buzzer.play(melody)
          resolve()
          res.sendStatus(200)
        })
              
        app.get('/piscar', (req, res) => {
          rgb.color(255,0,0)
          board.wait(1000, ()=>{
            rgb.color('green')
            board.wait(1000, ()=>{
              rgb.color('#0000ff')
            })
          })   
            setTimeout(() => {rgb.off(), resolve(), res.sendStatus(200)}, 3000)
        })
          
        // app.get('/intro', (req, res) => {
        //   var entrada = songs.load('starwars-theme')
        //     buzzer.play(entrada)
        //       setTimeout(() => { buzzer.stop(), res.status(200).send('{"abriu":"true"}')}, 9000)
        // })
        
//--------------------------------------------- Button config
        touch.on("press", function() {
          rgb.blink()    
          relay.on()
              setTimeout(() => { relay.off() }, 500)
              melody = songs.load('mario-intro')
              buzzer.play(melody)
              console.log("Botão Pressionado!")
              setTimeout(() => { rgb.stop(), rgb.off()}, 1000)
            })
            
            touch.on("release", function() {
              relay.off()
            console.log("Released!")
          })
          
          touch.on("hold", function() {
            relay.off()
            var entrada = songs.load('starwars-theme')
            buzzer.play(entrada)
            setTimeout(() => { buzzer.stop() }, 9000)  
            console.log("Holding...")
          })
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

