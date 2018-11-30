// app global const
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const router = express.Router()
//board arduino const
var EtherPort = require("etherport");
const five = require("johnny-five")
const board = new five.Board()//{port: new EtherPort(3030)}
var global

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
// define the post for oppening the pet_door
router.post('/abrir', (req, res) => {
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
const port = 3002 //process.env.PORT 

app.listen(port)
console.log('Arduino port:', port)
