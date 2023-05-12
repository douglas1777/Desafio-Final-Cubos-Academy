const knex = require('../database/config')

const salvarPedido = async (tabela, dados) => {
  const [novoItemInserido] = await knex(tabela).insert(dados).returning('*')
  return novoItemInserido
}


module.exports = { salvarPedido }
