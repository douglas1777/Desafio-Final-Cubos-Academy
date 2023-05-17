const schemasUsuario = require('./schemasUsuario')
const schemasCliente = require('./schemasCliente')
const schemasProduto = require('./schemasProduto')
const schemasPedido = require('./schemasPedido')

const schemas = {
  ...schemasUsuario,
  ...schemasCliente,
  ...schemasProduto,
  ...schemasPedido,
}

module.exports = { schemas }
