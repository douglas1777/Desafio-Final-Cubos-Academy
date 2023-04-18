const usuarios = require('./usuarios')
const login = require('./login')

const usuariosControlador = {
  ...usuarios,
  ...login
}

module.exports = {usuariosControlador}