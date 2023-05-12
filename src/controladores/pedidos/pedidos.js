const { StatusCodes } = require('http-status-codes')

const { repos } = require('../../repositorios')
const msg = require('../../utils/msgErros')
const { transportarEmail } = require('../../utils/transportador')

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

module.exports = { cadastrarPedido }
