'use strict'

function errorHandler (error) {
  console.error(error)
  throw new Error(`Fallo en el servidor: ${error}`)
}

module.exports = errorHandler
