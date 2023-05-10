/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('clientes', table => {
    table.bigIncrements('id').primary().index(),
    table.string('nome').index().notNullable(),
    table.string('email').unique().index().notNullable(),
    table.string('cpf').unique().index().notNullable(),
    table.string('cep').nullable()
    table.string('rua').nullable()
    table.string('numero').nullable()
    table.string('bairro').nullable()
    table.string('cidade').nullable()
    table.string('estado').nullable()

    table.comment('Tabela criada para adicionar clientes')
  })
  .then(() => console.log('Tabela clientes criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('clientes').then(() => console.log('Tabela usuários removida'))
};
