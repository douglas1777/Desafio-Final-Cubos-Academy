const { usuariosControlador } = require('./usuarios')
const { transacoesControlador } = require('./transacoes')
const { clientesControlador } = require('./clientes')
const { produtosControlador } = require('./produtos')

module.exports = {
  usuariosControlador,
  transacoesControlador,
  clientesControlador,
  produtosControlador
}
