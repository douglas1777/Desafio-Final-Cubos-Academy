const { usuariosControlador } = require('./usuarios')
const { categoriasControlador } = require('./categorias')
const { clientesControlador } = require('./clientes')
const { produtosControlador } = require('./produtos')
const { pedidosControlador } = require('./pedidos')
const { imagensControlador } = require('./imagens')

module.exports = {
  usuariosControlador,
  categoriasControlador,
  clientesControlador,
  produtosControlador,
  pedidosControlador,
  imagensControlador,
}
