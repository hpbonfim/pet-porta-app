// app global config
const express = require('express')
const router = express.Router()
const PORT = 3004
const bodyParser = require('body-parser')
const app = express()
// http server config
const http = require('http')
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

const server = http.createServer(app)
server.listen(PORT)

// app.listen(PORT)
console.log(`pet_porta server: ${PORT}`)
