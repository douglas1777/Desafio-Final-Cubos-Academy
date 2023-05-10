/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table => {
    table.bigIncrements('id').primary().index(),
    table.string('nome').index().notNullable(),
    table.string('email').unique().index().notNullable(),
    table.string('senha').notNullable()

    table.comment('Tabela criada para adicionar usuários')
  })
  .then(() => console.log('Tabela usuarios criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuarios').then(() => console.log('Tabela usuários removida'))
};
