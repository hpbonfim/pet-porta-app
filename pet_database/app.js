// app global const
const express = require('express')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
//board arduino const
var EtherPort = require("etherport");
const five = require("johnny-five")
const board = new five.Board()//{port: new EtherPort(3030)}
var global
//sqlite db const
//const DB = require('./db')
//const db = new DB('sqlitedb')
//mysql and convict rules
const rules = require('./rules')
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
var pet_database = mysql.createConnection({
  host: rules.get('db.host'),
  user: rules.get('db.user'),
  password: rules.get('db.password'),
  database: rules.get('db.name')
});
pet_database.connect((err) => {
  if (!err)
      console.log('DB connection succeded.');
  else
      console.log('DB connection failed')
})
//----------------------------------------------------

//----------------------------------------------------
board.on("ready", function() {
  const relay = new five.Led(5);
    global = relay
  this.repl.inject({
    relay: relay
  })
})
//opening the door
router.post('/abrir', function(){
  global.off()  
  setTimeout(function(){
        global.on()
      }, 1000)
})
//----------------------------------------------------
//3/11/2018
router.post('/register', (req, res) => {
  let user = req.body;
  var sql = "SET @UserID = ?;SET @name = ?;SET @email = ?;SET @password = ?; \
  CALL UserAddOrEdit(@UserID,@name,@email, @password);";
  pet_database.query(sql, [user.UserID, user.name, user.email, bcrypt.hashSync(user.password, 8)], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              //if(element.constructor == Array) - 7/10
              let token = jwt.sign({ id: UserID }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              })
              res.status(200).send({ auth: true, token: token, user: user })
              //res.send('user id : '+element[0].UserID) - 7/10
          });
      else
          console.log(err);
  })
})
//------------------------------------------

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
      let token = jwt.sign({ id: user.id }, config.secret, {
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
      let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
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
    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})
//----------------------------------------------------
// express server to make our application accessible
app.use(router)
const port = 3005 //process.env.PORT 
app.listen(port)
console.log('Gateway:', port)
