const repoClientes = require('./clientes')
const repoProdutos = require('./produtos')
const repoUsuarios = require('./usuarios')
const repoPedidos = require('./pedidos')

const repos = {
  ...repoClientes,
  ...repoProdutos,
  ...repoUsuarios,
  ...repoPedidos
}

module.exports = { repos }
