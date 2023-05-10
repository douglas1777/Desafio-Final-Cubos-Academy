const knex = require('../database/config')

const consultaCliente = async (email, cpf) => {
  return await knex('clientes').where({ email }).orWhere({ cpf }).first()
}
const salvarCliente = async (cliente) => {
  const [inserirCliente] = await knex('clientes').insert(cliente).returning('*')
  return inserirCliente
}
const atualizarCliente = async (cliente, id) => {
  return await knex('clientes').update(cliente).where({ id })
}
const listarClientes = async () => {
  return await knex('clientes')
}
const clienteDetalhado = async (id) => {
  return await knex('clientes').where({ id }).first()
}
module.exports = {
  consultaCliente,
  salvarCliente,
  atualizarCliente,
  listarClientes,
  clienteDetalhado,
}
