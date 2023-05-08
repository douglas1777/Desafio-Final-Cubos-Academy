const { StatusCodes } = require('http-status-codes')

const {
  erro_categoria_nao_encontrada,
  erro_produto_nao_encontrado,
} = require('../../utils/msgErros')
const { repos } = require('../../repositorios')

const cadastrarProduto = async (req, res) => {
  const { categoria_id } = req.body

  const categoria = await repos.verificarCategoriaExiste(categoria_id)

  if (!categoria) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_categoria_nao_encontrada)
  }

  const produto = await repos.salvarProduto(req.body)

  res.status(StatusCodes.CREATED).json(produto)
}

const listarProdutos = async (req, res) => {
  let arrayCategoria = req.query.categoria_id

  if (arrayCategoria) {
    if (typeof arrayCategoria === 'string') arrayCategoria = [arrayCategoria]

    const categoria = await repos.filtrarCategoriasExistem(arrayCategoria)

    if (!categoria) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(erro_categoria_nao_encontrada)
    }
  }

  const produtos = await repos.detalharProdutos(arrayCategoria)

  if (!produtos[0]) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
  }

  res.status(StatusCodes.OK).json(produtos)
}

const editarProduto = async (req, res) => {
  const { id } = req.params

  const { categoria_id } = req.body

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
  }

  const categoria = await repos.verificarCategoriaExiste(categoria_id)

  if (!categoria) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_categoria_nao_encontrada)
  }

  await repos.atualizarProduto(req.body, id)

  res.status(StatusCodes.NO_CONTENT).send()
}

const detalharProduto = async (req, res) => {
  const { id } = req.params

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
  }

  res.status(StatusCodes.OK).json(produto)
}

const excluirProduto = async (req, res) => {
  const { id } = req.params

  const produto = await repos.verificarProdutoExiste(id)

  if (!produto) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
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
