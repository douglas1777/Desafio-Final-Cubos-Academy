const jwt = require('jsonwebtoken')

const knex = require('../config/conexao')

const consultaCliente = async (emailOuCPF) => {
  if (typeof emailOuCPF === 'string') {
    return await knex('clientes').where({ email: emailOuCPF }).first()
  }
  return await knex('clientes').where({ cpf: emailOuCPF }).first()
}
const salvarCliente = async (cliente) => {
  return await knex('clientes').insert(cliente).returning('*')
}
const atualizarcliente = async (cliente, id) => {
  return await knex('clientes').update(cliente).where({ id: id })
}
module.exports = { consultaCliente, salvarCliente, atualizarcliente }
