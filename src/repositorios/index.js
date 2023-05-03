const repoClientes = require('./clientes')
const repoProdutos = require('./produtos')
const repoUsuarios = require('./usuarios')

const repos = {
  ...repoClientes,
  ...repoProdutos,
  ...repoUsuarios,
}

module.exports = { repos }
