const { Router } = require('express')

const { validarToken } = require('../intermediarios/autenticacao')
const { usuariosControlador } = require('../controladores')
const { schemas } = require('../schemas')

const router = Router()

router.post('/', schemas.validacaoCampos, usuariosControlador.cadastrarUsuario)
//daqui pra baixo,precisa estar logado
router.use(validarToken)

router.get('/', usuariosControlador.detalharUsuario)

router.put('/', schemas.validacaoCampos, usuariosControlador.editarUsuario)

module.exports = router
