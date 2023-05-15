const knex = require('../database/config')

const salvarPedido = async (tabela, dados) => {
  const [novoItemInserido] = await knex(tabela).insert(dados).returning('*')
  return novoItemInserido
}
const listasPedidos = async (tabela, cliente_id) => {
  if (cliente_id) {
    const pedidos = await knex(tabela)
      .select(
        'pedidos.id',
        'pedidos.valor_total',
        'pedidos.observacao',
        'pedidos.cliente_id',
        'pedido_produtos.id AS pedido_produtos.id',
        'pedido_produtos.quantidade_produto',
        'pedido_produtos.valor_produto',
        'pedido_produtos.pedido_id',
        'pedido_produtos.produto_id'
      )
      .where('cliente_id', cliente_id)
      .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
      .orderBy('id', 'asc')

    return pedidos
  } else {
    const pedidos = await knex(tabela)
      .select(
        'pedidos.id',
        'pedidos.valor_total',
        'pedidos.observacao',
        'pedidos.cliente_id',
        'pedido_produtos.id AS pedido_produtos.id',
        'pedido_produtos.quantidade_produto',
        'pedido_produtos.valor_produto',
        'pedido_produtos.pedido_id',
        'pedido_produtos.produto_id'
      )
      .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
      .orderBy('id', 'asc')

    return pedidos
  }
}

module.exports = { salvarPedido, listasPedidos }
