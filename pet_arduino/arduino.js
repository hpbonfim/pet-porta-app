const express = require('express')
const app = express()
const io = require('socket.io')(3005)
const router = express.Router()
const port = 3000;
let relay, setState
var EthernetPort = require('etherport')
const five = require('johnny-five')
const board = new five.Board({ repl: false }) // { port: new EthernetPort(3030) }
// ------------------------------------------------------------
board.on('ready', function () {
  // console.log('Arduino está pronto!')
  // Helper function to set the colors
  relay = new five.Relay({
    type: 'NC',
    pin: 10
  })
  const setState = function () {
    return this.relay.toggle()
  }
  // ----------------------------------------------------
  io.on('connection', function (sock) {
    // ----------------------------------------------------
    sock.on('abrir', function () {
      // ----------------------------------------------------
      console.log(sock.id)
      setState()
    })
  })
})
// ----------------------------------------------------
app.listen(port)
console.log("Arduino port: ",port)