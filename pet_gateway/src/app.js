// app global const
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const app = express()
const router = express.Router()
//jwt bodyparser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
//------------------------------------------------------------
// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})
//----------------------------------------------------

// Connecta ao banco MongoDB
mongoose.connect(config.connectionString)

// Carrega os Models
const usuarios = require('../models/usuarios')

// Carrega as Rotas
const indexRoute = require('./routes/router-index')

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute)

module.exports = app;
//----------------------------------------------------