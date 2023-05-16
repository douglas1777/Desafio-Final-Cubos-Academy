const knex = require('../database/config')

exports.consultaCategorias = async (tabela) => {
  return await knex(tabela)
}
