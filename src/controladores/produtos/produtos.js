const { StatusCodes } = require('http-status-codes')

const msg = require('../../utils/msgErros')
const { repos } = require('../../repositorios')
const { verificaUrl, apagaImagem } = require('../../utils/validaImagem')

const cadastrarProduto = async (req, res) => {
  const { categoria_id, produto_imagem } = req.body

  const categoria = await repos.verificarCategoriaExiste(categoria_id)

  if (!categoria) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_categoria_nao_encontrada)
  }

  if (produto_imagem) {
    const path = produto_imagem.split('/')

    const imagemExiste = await verificaUrl(
      produto_imagem,
      path[path.length - 2]
    )

    if (!imagemExiste) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(msg.erro_imagem_nao_encontrada)
    }
  }

  const produto = await repos.salvarProduto(req.body)

  res.status(StatusCodes.CREATED).json(produto)
}

const listarProdutos = async (req, res) => {
  let categoriaQuery = req.query.categoria_id

  if (categoriaQuery) {
    if (typeof categoriaQuery === 'string') categoriaQuery = [categoriaQuery]

    const categoria = await repos.filtrarCategoriasExistem(categoriaQuery)

    if (!categoria) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(msg.erro_categoria_nao_encontrada)
    }
  }

  const produtos = await repos.detalharProdutos(categoriaQuery)

  if (!produtos[0]) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_produto_nao_encontrado)
  }

  res.status(StatusCodes.OK).json(produtos)
}

const editarProduto = async (req, res) => {
  const { id } = req.params
  let { produto_imagem } = req.body
  const { categoria_id } = req.body

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_produto_nao_encontrado)
  }

  const categoria = await repos.verificarCategoriaExiste(categoria_id)

  if (!categoria) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_categoria_nao_encontrada)
  }

  if (!produto_imagem) {
    produto_imagem = null
  } else {
    const imagemExiste = await verificaUrl(produto_imagem)

    if (!imagemExiste) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(msg.erro_imagem_nao_encontrada)
    }
  }

  await repos.atualizarProduto({ ...req.body, produto_imagem }, id)

  res.status(StatusCodes.NO_CONTENT).send()
}

const detalharProduto = async (req, res) => {
  const { id } = req.params

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_produto_nao_encontrado)
  }

  res.status(StatusCodes.OK).json(produto)
}

const excluirProduto = async (req, res) => {
  const { id } = req.params

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(msg.erro_produto_nao_encontrado)
  }

  const produtoPedido = await repos.consultaProdutoFoiPedido(
    'pedido_produtos',
    id
  )

  if (produtoPedido) {
    return res.status(StatusCodes.BAD_REQUEST).json(msg.erro_produto_pedido)
  }

  if (produto.produto_imagem) {
    const apagaImagemServidor = await apagaImagem(produto.produto_imagem)

    if (apagaImagemServidor instanceof Error) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(msg.erro_imagem_nao_encontrada)
    }
  }

  await repos.deletarProduto(id)

  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
  excluirProduto,
}
