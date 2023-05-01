const knex = require('../config/conexao')

const consultaCliente = async (email, cpf) => {
  return await knex('clientes').where({ email }).orWhere({ cpf }).first()
}
const salvarCliente = async (cliente) => {
  return await knex('clientes').insert(cliente).returning('*')
}
const atualizarCliente = async (cliente, id) => {
  return await knex('clientes').update(cliente).where(id)
}
const listaClientes = async () => {
  return await knex('clientes')
}
const clienteDetalhado = async (id) => {
  return await knex('clientes').where({ id })
}
module.exports = {
  consultaCliente,
  salvarCliente,
  atualizarCliente,
  listaClientes,
  clienteDetalhado,
}
