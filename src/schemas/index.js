const schemasUsuario = require('./schemasUsuario')
const schemasCliente = require('./schemasCliente')

const schemas = {
  ...schemasUsuario,
  ...schemasCliente,
}

module.exports = { schemas }
