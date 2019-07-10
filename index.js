'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// definiedo el esquema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })
// Ejecutar en la terminal el query hello
// graphql(schema, '{saludo}', resolvers).then((data) => {
//     console.log(data)
// })

// Se configura el cors para acceder desde cualquier lugar la api,
// se podria configurar que rangos tienen acceso pero queda abierto a cualquiera en este momento 
app.use(cors())

// Ejecucion a travez de un servidor web
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

// escuchamos
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
