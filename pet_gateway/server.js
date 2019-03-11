//routes
const userRoutes = require("./api/routes/user")
const arduinoRoutes = require("./api/routes/arduino")

// Configuring the database
const bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

//http calls
const database = require("./database.config.js")
const mongoose = require("mongoose")
const axios = require('axios')
const http = require("http")
const port = process.env.GATEWAY_PORT

// app.use(cors()); // CORS middleware
app.use(morgan("dev"))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({  extended: false }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// Database Config
mongoose.Promise = global.Promise

mongoose
  .connect(database.url, { useMongoClient: true })
  .then(() => {
    console.log("conectado com sucesso")
  })
  .catch(err => {
    console.log("Erro ao connectar", err)
    process.exit()
  })
  

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

// Routes to handle requests
app.use("/abrir", arduinoRoutes)
app.use("/user", userRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  console.log(error)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  console.log(error)
  res.json({
    error: {
      message: error.message
    }
  })
})

const server = http.createServer(app)

server.listen(port, () => {
console.log("pet_gateway server: ", port)
})