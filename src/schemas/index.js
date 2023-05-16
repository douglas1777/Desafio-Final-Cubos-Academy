const schemasUsuario = require('./schemasUsuario')
const schemasCliente = require('./schemasCliente')
const schemasProduto = require('./schemasProduto')
const schemasPedido = require('./schemasPedido')
const schemasImagem = require('./schemasImagem')

const schemas = {
  ...schemasUsuario,
  ...schemasCliente,
  ...schemasProduto,
  ...schemasPedido,
  ...schemasImagem
}

module.exports = { schemas }
