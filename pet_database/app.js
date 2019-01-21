const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3003
// create express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("conectado com sucesso")  
}).catch(err => {
    console.log('Erro ao connectar', err)
    process.exit()
});

// define a simple route
app.get('/', (req, res) => {
    //res.json({"title": "PET_DATABASE"});
})

const usuario = require('./controller.js')

// Create a new user
app.post('/register', usuario.create)

// Retrieve all users
app.get('/usuarios', usuario.findAll)

// login a single user with your ID
app.get('/usuario/:usuarioId', usuario.findOne)

// Update a user with your ID
app.put('/usuario/:usuarioId', usuario.update)

// Delete a user with your ID
app.delete('/usuario/:usuarioId', usuario.delete)

// listen for requests
app.listen(port, () => {
    console.log("pet_database server: ", port);
})