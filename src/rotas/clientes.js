const { Router } = require('express')
const { schemas } = require('../schemas')
const { clientesControlador } = require('../controladores')

const rotas = Router()

rotas.post(
  '/',
  schemas.validacaoCamposCliente,
  clientesControlador.cadastrarCliente
)
rotas.put(
  '/:id',
  schemas.validacaoCamposCliente,
  clientesControlador.editarCliente
)
rotas.get('/', clientesControlador.listarClientes)
rotas.get('/:id', clientesControlador.detalharCliente)

module.exports = rotas
