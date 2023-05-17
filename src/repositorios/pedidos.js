const knex = require('../database/config')

const salvarPedido = async (tabela, dados) => {
  const [novoItemInserido] = await knex(tabela).insert(dados).returning('*')
  return novoItemInserido
}

const listasPedidos = async (tabela, cliente_id) => {
  const pedidos = knex(tabela).select(
    'pedidos.*',
    'p.id AS pedido_produtos.id',
    'p.quantidade_produto',
    'p.valor_produto',
    'p.pedido_id',
    'p.produto_id'
  )

  if (cliente_id) pedidos.where('cliente_id', cliente_id)

  pedidos
    .join('pedido_produtos as p', 'pedidos.id', 'p.pedido_id')
    .orderBy('pedidos.id', 'asc')
    .then((response) => response)

  return await pedidos
}

const consultaProdutoFoiPedido = async (tabela, id) => {
  return await knex(tabela).where({ id }).first()
}

module.exports = { salvarPedido, listasPedidos, consultaProdutoFoiPedido }
