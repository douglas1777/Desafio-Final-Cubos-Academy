const { Router } = require('express')
const { validarToken } = require('../intermediarios/autenticacao')
const { schemas } = require('../schemas')
const { clientesControlador } = require('../controladores')

const router = Router()

router.use(validarToken)

router.post(
  '/',
  schemas.validacaoCamposCliente,
  clientesControlador.cadastrarCliente
)
router.put(
  '/:id',
  schemas.validacaoCamposCliente,
  clientesControlador.editarCliente
)

module.exports = router
