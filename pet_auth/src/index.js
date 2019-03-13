require('dotenv').config()

const Hapi     = require('hapi')
const routes   = require('./routes')
const Boom     = require('boom')
const config = require('../config')

require('./utils/database')

const server = Hapi.server({
  port: process.env.PORT || 3001,
  host: process.env.HOST/* || 'localhost'*/,
  routes: { cors: true }
})

const validate = async function (decoded, request) {
  console.log('running validate...')

  console.log(decoded)
  console.log(request)

  return { isValid: true }
}


const startServer = async () => {
  try {

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', { 
      key: config.SECRET_KEY,
      validate,
      verifyOptions: { 
        algorithms: [ 'HS256' ] 
      }
    })

    server.auth.default('jwt');

    routes.forEach((route)=>{
      server.route(route)
    })

    await server.start()

    console.log(`pet_auth running at: ${server.info.uri}`)

  } catch (err) {
    console.log(err)
    Boom.badImplementation(err)
  }
}

startServer()

module.exports = server