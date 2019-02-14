// Basic Global Config
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const port = 3300
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// Arduino Config
const five = require("johnny-five")
// const EtherPort = require("etherport")
const relay = require('./modules/relay')

const board = new five.Board({
  repl: false,
  debug: false,
  //port: new EtherPort(3030)
})
// simple CORS Middleware
app.use(cors())
// 2 ways parser (JSON/XML)
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json

app.use(express.static(__dirname))

app.get('/test',(req, res) => {
  console.log('Online')
  res.sendStatus(200)
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

board.on("message", function(event) {
  app.get('/time', (req, res) => {
    const time = (new Date()).toLocaleTimeString()
    res.status(404).send(`Hora: ${time}`)
  })
  app.get('/', (req, res) => {
    res.sendStatus(200)
  })
  /*
  Event {
    type: "info"|"warn"|"fail",
    timestamp: Time of event in milliseconds,
      class: name of relevant component class,
      message: message [+ ...detail]
    }
  */
 console.log("Received a %s message, from %s, reporting: %s", event.type, event.class, event.message);
})
// ------------------------------------------------------------
server.listen(port, function() {
  console.log("Arduino port: ",port)
})
// ----------------------------------------------------