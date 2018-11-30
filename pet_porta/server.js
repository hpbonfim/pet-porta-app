const http = require('http')
const express = require('express')
const app = express()
const router = express.Router()
// const port = 3001

app.use('/', express.static(`${__dirname}/dist`)) // set the static files location for the static html
app.use('/', router)

// app.listen(port)
// console.log('App running on port', port)

const PORT = 3001
const HOST = '0.0.0.0'
// app.set('port', PORT)
const server = http.createServer(app)

server.listen(PORT)
// console.log('Rodando em:', PORT)

// ---------- for http test
// app.listen(PORT, HOST)
console.log(`Rodando em http://${HOST}:${PORT}`);
