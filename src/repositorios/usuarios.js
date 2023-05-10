const knex = require('../database/config')

const consultaUsuario = async (emailOuId) => {
  if (typeof emailOuId === 'string') {
    return await knex('usuarios').where({ email: emailOuId }).first()
  }
  return await knex('usuarios').where({ id: emailOuId }).first()
}

const salvarUsuario = async (usuario) => {
  const [salvarUsuario] = await knex('usuarios').insert(usuario).returning('*')
  return salvarUsuario
}
const atualizarUsuario = async (usuario, id) => {
  return await knex('usuarios').update(usuario).where({ id: id })
}

module.exports = { consultaUsuario, salvarUsuario, atualizarUsuario }
