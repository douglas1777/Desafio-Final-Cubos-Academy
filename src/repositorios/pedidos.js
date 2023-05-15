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
      .leftJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
      .groupBy('pedidos.id', 'pedido_produtos.id')
      .orderBy('pedidos.id', 'asc')
    const resultado = []

    for (const pedido of pedidos) {
      const pedidoExistente = resultado.find((p) => p.pedido.id === pedido.id)

      if (pedidoExistente) {
        pedidoExistente.pedido_produtos.push({
          id: pedido['pedido_produtos.id'],
          quantidade_produto: pedido.quantidade_produto,
          valor_produto: pedido.valor_produto,
          pedido_id: pedido.pedido_id,
          produto_id: pedido.produto_id,
        })
      } else {
        resultado.push({
          pedido: {
            id: pedido.id,
            valor_total: pedido.valor_total,
            observacao: pedido.observacao,
            cliente_id: pedido.cliente_id,
          },
          pedido_produtos: [
            {
              id: pedido['pedido_produtos.id'],
              quantidade_produto: pedido.quantidade_produto,
              valor_produto: pedido.valor_produto,
              pedido_id: pedido.pedido_id,
              produto_id: pedido.produto_id,
            },
          ],
        })
      }
    }

    return resultado
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
      .leftJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
      .groupBy('pedidos.id', 'pedido_produtos.id')
      .orderBy('pedidos.id', 'asc')
    return pedidos
  }
}

module.exports = { salvarPedido, listasPedidos }
