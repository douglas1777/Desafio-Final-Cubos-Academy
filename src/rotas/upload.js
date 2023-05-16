const { Router } = require('express')

const { imagensControlador } = require('../controladores')
const validarImagem = require('../intermediarios/multer')
const { schemas } = require('../schemas')

const rotas = Router()

rotas.post('/', validarImagem, schemas.imagemSchema, imagensControlador.upload)
rotas.get('/', imagensControlador.listar)

module.exports = rotas
