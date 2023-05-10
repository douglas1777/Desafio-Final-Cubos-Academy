/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { criptografar } = require('../../utils/bcrypt')

exports.seed = async function (knex) {
  const [{ count }] = await knex('usuarios').count('* as count')

  if (!Number.isInteger(count) || count > 0) return

  const senha = await criptografar('123')
  return await knex('usuarios').insert([
    {
      nome: 'bruno',
      email: 'bruno@gmail.com',
      senha,
    },
    {
      nome: 'jose',
      email: 'jose@gmail.com',
      senha,
    },
  ])
}
