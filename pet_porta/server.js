// app global config
const express = require('express')
const router = express.Router()
const PORT = 3020
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
// http server config
const http = require('http')

// --------------------------------------------- start APP config
app.use(cors()) // CORS middleware
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use('/', express.static(`${__dirname}/dist`)) // set the static files location for the static html
app.use('/', router) // run all config and express on "/"

const server = http.createServer(app)
server.listen(PORT)

console.log(`pet_porta server: ${PORT}`)
