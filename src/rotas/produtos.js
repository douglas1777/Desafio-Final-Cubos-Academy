const { Router } = require('express')
const { validarToken } = require('../intermediarios/autenticacao')
const { schemas } = require('../schemas')
const { produtosControlador } = require('../controladores')

const router = Router()

router.use(validarToken)

router.get('/', produtosControlador.listarProduto)

router.post('/', schemas.validacaoCamposProduto, produtosControlador.cadastrarProduto)

router.put('/:id', schemas.validacaoCamposProduto, produtosControlador.editarProduto)

router.get('/:id', produtosControlador.detalharProduto)

router.delete('/:id', produtosControlador.excluirProduto)

module.exports = router