// app global const
const port = 3000 //process.env.PORT 
const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const secret = { 'secret': 'supersecret' }
//board arduino const
const five = require("johnny-five")
const board = new five.Board()
var global
//sqlite db const
const db = new DB('sqlitedb')
const app = express()
const router = express.Router()
//jwt bodyparser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
//------------------------------------------------------------
// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
app.use(allowCrossDomain)
//----------------------------------------------------
// Init MySQL Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name')
});
connection.connect();
//----------------------------------------------------
// Init redis connection
var redis = require("redis"),
  client = redis.createClient({
    host: config.get('redis.host')
  });

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set("foo", "bar", redis.print);

app.get("/redis", function (req, res) {
  client.get('foo', (err, reply) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      key: 'foo',
      value: reply
    });
  })
});
//----------------------------------------------------
//opening the door
router.post('/abrir', function(req, res){
  global.off();
    setTimeout(function(){
        global.on();
      }, 1000);
      res.send('ok');
});

board.on("ready", function() {
  var fechadura = new five.Led(7);
  fechadura.on();
  DelayNode(10);
  fechadura.off();
});
//----------------------------------------------------
// registering a new user
router.post('/register', function (req, res) {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  function (err) {
    if (err) return res.status(500).send('Problemas ao registrar sua conta. Verifique com o Administrador')
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('Usuário não encontrado')
      let token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token, user: user })
    })
  })
})
//----------------------------------------------------
// define the route for registering an administrator and logging in
router.post('/register-admin', function (req, res) {
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8), 1
  ],
  function (err) {
    if (err) return res.status(500).send('Problemas ao registrar sua conta. Verifique com o Administrador')
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('Usuário não encontrado')
      let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token, user: user })
    })
  })
})
//----------------------------------------------------
// define the route for logging and setting up board for arduino
router.post('/login', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Erro no Servidor.')
    if (!user) return res.status(404).send('Nenhum usuário encontrado.')
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})
//----------------------------------------------------
// express server to make our application accessible
app.use(router)
app.listen(port)
console.log('App running on port', port)