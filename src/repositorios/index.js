const repoClientes = require('./clientes')
const repoProdutos = require('./produtos')
const repoUsuarios = require('./usuarios')
const repoPedidos = require('./pedidos')
const repoCategorias = require('./categorias')

const repos = {
  ...repoClientes,
  ...repoProdutos,
  ...repoUsuarios,
  ...repoPedidos,
  ...repoCategorias
}

module.exports = { repos }
