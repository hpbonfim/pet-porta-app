// app global const
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
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
//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
// express server to make our application accessible
app.use(router)
const port = 3000 //process.env.PORT 

app.listen(port)
console.log('Gateway:', port)