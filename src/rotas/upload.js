const { Router } = require('express')

const { imagensControlador } = require('../controladores')
const validarImagem = require('../intermediarios/multer')

const rotas = Router()

rotas.post('/', validarImagem, imagensControlador.upload)

module.exports = rotas
