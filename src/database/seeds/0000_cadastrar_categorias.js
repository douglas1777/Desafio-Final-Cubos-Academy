/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const [{ count }] = await knex('categorias').count('* as count')

  if (!Number.isInteger(count) || count > 0) return

  const inserirDescricoes = descricoes.map((descricao) => ({ descricao }))
  
  return await knex('categorias').insert(inserirDescricoes)
}

const descricoes = [
  'Informática',
  'Celulares',
  'Beleza e Perfumaria',
  'Mercado',
  'Livros e Papelaria',
  'Brinquedos',
  'Moda',
  'Bebê',
  'Games',
]
