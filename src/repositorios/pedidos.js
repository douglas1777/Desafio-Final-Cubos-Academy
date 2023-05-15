const knex = require('../database/config')

const salvarPedido = async (tabela, dados) => {
  const [novoItemInserido] = await knex(tabela).insert(dados).returning('*')
  return novoItemInserido
}

const consultaProdutoFoiPedido = async (tabela, pedido_id) => {
  return await knex(tabela).where({ pedido_id }).first()
}

module.exports = { salvarPedido, consultaProdutoFoiPedido }
