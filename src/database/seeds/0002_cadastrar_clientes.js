/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  const [{ count }] = await knex('clientes').count('* as count')

  if (!Number.isInteger(count) || count > 0) return

  return await knex('clientes').insert([
    {
      nome: 'José',
      email: 'jose@email.com',
      cpf: '12345668804',
    },
    {
      nome: 'Fulano',
      email: 'fulano@email.com',
      cpf: '76348668804',
    },
  ])
}
