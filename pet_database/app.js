const express = require('express')
const bodyParser = require('body-parser')
const port = 3033
const usuario = require('./controller.js')
// create express app
const app = express()
const cors = require('cors')
//test
const users = require('./router')
var jwt = require('jsonwebtoken')
app.set('secretKey', 'senha') // jwt secret token

app.use(cors()) // CORS middleware

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
})

// define a simple route
app.get('/', (req, res) => {
    //res.json({"title": "PET_DATABASE"});
})
// public route
app.use('/users', validateUser, users)

// Create a new user
app.post('/register', usuario.create)

// Retrieve all users
app.get('/usuarios', validadeUser, usuario.findAll)

// login a single user with your Nome
app.get('/teste/:nome', usuario.findbyNome)

// login a single user with your ID
app.get('/usuario/:usuarioId', usuario.findOne)

// Update a user with your ID
app.put('/usuario/:usuarioId', usuario.update)

// Delete a user with your ID
app.delete('/usuario/:usuarioId', usuario.delete)

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    })
  }
  // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
  // handle 404 error
  app.use(function(req, res, next) {
   let err = new Error('Not Found');
      err.status = 404;
      next(err);
  });
  // handle errors
  app.use(function(err, req, res, next) {
   console.log(err);
   
    if(err.status === 404)
     res.status(404).json({message: "Not found"});
    else 
      res.status(500).json({message: "Something looks wrong :( !!!"});
  });

// listen for requests
app.listen(port, () => {
    console.log("pet_database server: ", port);
})