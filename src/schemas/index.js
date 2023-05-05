const schemasUsuario = require('./schemasUsuario')
const schemasCliente = require('./schemasCliente')
const schemasProduto = require('./schemasProduto')

const schemas = {
  ...schemasUsuario,
  ...schemasCliente,
  ...schemasProduto
}

module.exports = { schemas }
