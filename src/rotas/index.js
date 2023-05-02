const { Router } = require('express')

const { erros } = require('../intermediarios/erros')
const rotasUsuarios = require('./usuarios.js')
const rotasCategorias = require('./categorias')
const rotasAutenticacao = require('./autenticacao')
const rotasClientes = require('./clientes')
const rotaProdutos = require('./produtos')

const rotas = Router()

rotas.use('/usuario', rotasUsuarios)
rotas.use('/categoria', rotasCategorias)
rotas.use('/login', rotasAutenticacao)
rotas.use('/cliente', rotasClientes)
rotas.use('/produto', rotaProdutos)
rotas.use(erros)

module.exports = { rotas }
