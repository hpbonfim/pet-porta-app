const mongoose = require('mongoose')
const database = require('../../config')
require('../models')

mongoose
  .connect(database.url, { useNewUrlParser: true })
  .then(() => {
    console.log("conectado com sucesso")
  })
  .catch(err => {
    console.log("Erro ao connectar", err)
    process.exit()
  })