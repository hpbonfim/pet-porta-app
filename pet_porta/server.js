// app global config
const express = require('express')
const router = express.Router()
const PORT = 3001
// database global config
const db = express()
// database/app global config
const bodyParser = require('body-parser')
const app = express()
// http server config
const http = require('http')
const server = http.createServer(app)



// --------------------------------------------- start APP config
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use('/', express.static(`${__dirname}/dist`)) // set the static files location for the static html
app.use('/', router) // run all config and express on "/"

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
app.use(allowCrossDomain)
server.listen(PORT)
// app.listen(PORT)
console.log(`pet_porta server: ${PORT}`)
// end APP config

// --------------------------------------------- start database config
const dbConfig = require('./src/database/database.config.js')
const mongoose = require('mongoose')
const port = 3333

db.use(bodyParser.json()) // parse requests of content-type - application/json
db.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('conectado com sucesso')
}).catch(err => {
  console.log('Erro ao connectar', err)
  process.exit()
})

const usuario = require('./src/database/controller.js')

// app.get('/', (req, res) => {
//  res.json({ 'title': 'Oe' })
// })

db.post('/register', usuario.create) // create a new user

db.get('/usuarios', usuario.findAll) // Retrieve all users

db.get('/usuario/:usuarioId', usuario.findOne) // login a single user with your ID

db.put('/usuario/:usuarioId', usuario.update) // Update a user with your ID

db.delete('/usuario/:usuarioId', usuario.delete) // Delete a user with your ID

// listen for all database requests
db.listen(port, () => {
  console.log('pet_database server: ', port)
})
// end database config

