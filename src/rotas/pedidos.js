const { Router } = require('express')

const { pedidosControlador } = require('../controladores')
const { schemas } = require('../schemas')

const rotas = Router()

rotas.post('/', schemas.validacaoCamposPedido, pedidosControlador.cadastrarPedido)

module.exports = rotas
