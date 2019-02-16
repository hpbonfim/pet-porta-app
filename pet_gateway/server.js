//USER routes
const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require("./api/routes/user")
//DB global const
const bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
//HTTP global const
const port = 3000
const http = require("http")
const mongoose = require("mongoose")
const server = http.createServer(app)
const db = require("./database.config.js")
//CHAT (in dev)
// const path = require('path')
// const room = require('./api/routes/room')
// const chat = require('./api/routes/chat')

//---------------------------------------------//
app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Routes to handle requests
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/user", userRoutes)

//------------------------------- CORS middleware
// app.use(cors());  (2º opção)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

//-------------------------------- Database Config
mongoose.Promise = global.Promise
mongoose
  .connect(db.url, {useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => {
    console.log("conectado com sucesso")
  })
  .catch(err => {
    console.log("Erro ao connectar", err)
    process.exit()
  })

//--------------------------------- 404 Error handle
app.use((req, res, next) => {
  var error = new Error("Nada encontrado")
  error.status = 404
  console.log(error)
  next(error)
})

//---------------------------------- 500 Error handle
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  console.log(error)
  res.json({
    error: {
      message: error.message
    }
  })
})

//---------------------------------------------//
// CHAT terminar de codar
// app.use('/api/room', room)
// app.use('/api/chat', chat)
// app.use('/rooms', express.static(path.join(__dirname)))

//CHAT banco de dados
// var mongooseChat = require('mongoose')
// mongooseChat.Promise = require('bluebird')
// mongooseChat.connect('mongodb://localhost:27017/pet-chat', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('chat connectado'))
//   .catch((err) => console.error(err))
//---------------------------------------------//

//----------------------------- listen for request
server.listen(port, () => {
  console.log("pet_gateway server: ", port)
})