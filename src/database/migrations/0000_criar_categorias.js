/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('categorias', table => {
    table.bigIncrements('id').primary().index(),
    table.string('descricao').index().notNullable(),

    table.comment('Tabela criada para adicionar categorias')
  })
  .then(() => console.log('Tabela categorias criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('categorias').then(() => console.log('Tabela categorias removida'))
};
