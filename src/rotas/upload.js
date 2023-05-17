const { Router } = require('express')

const { imagensControlador } = require('../controladores')
const {validarImagem, validarRequisicaoImagem} = require('../intermediarios/multer')

const rotas = Router()

rotas.post('/upload', validarImagem, validarRequisicaoImagem, imagensControlador.upload)
rotas.get('/', imagensControlador.listar)

module.exports = rotas
