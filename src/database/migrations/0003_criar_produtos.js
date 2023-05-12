/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('produtos', table => {
    table.bigIncrements('id').primary().index(),
      table.string('descricao').notNullable(),
      table.string('quantidade_estoque').notNullable(),
      table.integer('valor').notNullable(),
      table.integer('categoria_id').notNullable().references('id').inTable('categorias')
    table.string('produto_imagem').nullable(),

      table.comment('Tabela criada para adicionar produtos')
  })
    .then(() => console.log('Tabela produtos criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('produtos').then(() => console.log('Tabela produtos removida'))
};
