const { usuariosControlador } = require('./usuarios')
const { transacoesControlador } = require('./transacoes')
const { clientesControlador } = require('./clientes')
const { produtosControlador } = require('./produtos')
const { pedidosControlador } = require('./pedidos')
const { imagensControlador } = require('./imagens')

module.exports = {
  usuariosControlador,
  transacoesControlador,
  clientesControlador,
  produtosControlador,
  pedidosControlador,
  imagensControlador,
}
