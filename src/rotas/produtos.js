const { Router } = require('express')
const { schemas } = require('../schemas')
const { produtosControlador } = require('../controladores')

const rotas = Router()

rotas.get('/', produtosControlador.listarProdutos)

rotas.post(
  '/',
  schemas.validacaoCamposProduto,
  produtosControlador.cadastrarProduto
)

rotas.put(
  '/:id',
  schemas.validacaoCamposProduto,
  produtosControlador.editarProduto
)

rotas.get('/:id', produtosControlador.detalharProduto)

rotas.delete('/:id', produtosControlador.excluirProduto)

module.exports = rotas
