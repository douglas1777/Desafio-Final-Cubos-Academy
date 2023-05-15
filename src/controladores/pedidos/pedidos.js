const { StatusCodes } = require('http-status-codes')

const { repos } = require('../../repositorios')
const msg = require('../../utils/msgErros')
const { transportarEmail } = require('../../utils/transportador')
const { listasPedidos } = require('../../repositorios/pedidos')

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body

  const cliente = await repos.clienteDetalhado(cliente_id)

  if (!cliente) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_cliente_nao_encontrado)
  }

  let valor_total = 0
  const pedidos = []

  for (const produto of pedido_produtos) {
    const { produto_id, quantidade_produto } = produto

    const produtoExiste = await repos.verificarProdutoExiste(produto_id)

    if (!produtoExiste) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...msg.erro_produto_nao_encontrado,
        produto_id,
      })
    }

    if (Number(produtoExiste.quantidade_estoque) < quantidade_produto) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ...msg.erro_sem_estoque,
        produto_id: produto_id,
        quantidade_estoque: produtoExiste.quantidade_estoque,
      })
    }

    // Função bônus (não é obrigatório atualizar o estoque)
    await repos.atualizarProduto(
      {
        quantidade_estoque:
          produtoExiste.quantidade_estoque - quantidade_produto,
      },
      produto_id
    )

    valor_total += quantidade_produto * produtoExiste.valor

    const dadosPedido = {
      produto_id,
      quantidade_produto,
      valor_produto: produtoExiste.valor,
    }

    pedidos.push(dadosPedido)
  }

  const pedidoSalvo = await repos.salvarPedido('pedidos', {
    cliente_id,
    observacao,
    valor_total,
  })

  await repos.salvarPedido(
    'pedido_produtos',
    pedidos.map((pedido) => {
      return {
        pedido_id: pedidoSalvo.id,
        ...pedido,
      }
    })
  )

  const email_resposta = await transportarEmail(cliente)
  return res
    .status(StatusCodes.CREATED)
    .json({ ...pedidoSalvo, email_resposta })
}
const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query
  const pedidos = await listasPedidos('pedidos', cliente_id)
  if (pedidos.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_cliente_nao_encontrado)
  }
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

  return res.status(StatusCodes.OK).json(resultado)
}

module.exports = { cadastrarPedido, listarPedidos }
