const { Router } = require('express')

const { validarToken } = require('../intermediarios/autenticacao')
const { pedidosControlador } = require('../controladores')
const { schemas } = require('../schemas')

const router = Router()

router.use(validarToken)
router.post('/', schemas.validacaoCamposPedido, pedidosControlador.cadastrarPedido)

module.exports = router
