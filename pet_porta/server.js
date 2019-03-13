// app global config
const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()
const helmet = require('helmet')
var cookieParser = require('cookie-parser')
// http server config
const http = require('http')
const PORT = process.env.PORTA_PORT

// --------------------------------------------- start APP config
app.use(cors()) // CORS middleware
//app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse requests of content-type - application/x-www-form-urlencoded
app.use('/', express.static(`${__dirname}/dist`)) // set the static files location for the static html
app.use('/', router) // run all config and express on "/"

const server = http.createServer(app)
server.listen(PORT)
console.log(`pet_porta running on :${PORT}`)
