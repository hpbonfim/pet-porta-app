const http = require('http')
const express = require('express')
const app = express()
const router = express.Router()
app.use('/', express.static(`${__dirname}/dist`)) // set the static files location for the static html
app.use('/', router)
//app.listen(port)
//console.log('App running on port', port)
const PORT = 8000;
//const HOST = '0.0.0.0';
app.set('port', PORT);
const server = http.createServer(app);
server.listen(PORT);
console.log('Rodando em:', PORT)

//app.listen(PORT, HOST);
//console.log(`Rodando em http://${HOST}:${PORT}`);
