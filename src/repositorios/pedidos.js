const knex = require('../database/config')

const salvarPedido = async (tabela, dados) => {
  const [novoItemInserido] = await knex(tabela).insert(dados).returning('*')
  return novoItemInserido
}

const listasPedidos = async (tabela, cliente_id) => {
  const pedidos = knex(tabela).select('pedidos.*', 'p.*', 'p.id as pedidos_produtos_id')

  if (cliente_id) pedidos.where('cliente_id', cliente_id)

  pedidos
    .join('pedido_produtos as p', 'pedidos.id', 'p.pedido_id')
  return await pedidos
}

const consultaProdutoFoiPedido = async (tabela, produto_id) => {
  return await knex(tabela).where({ produto_id }).first()
}

module.exports = { salvarPedido, listasPedidos, consultaProdutoFoiPedido }
