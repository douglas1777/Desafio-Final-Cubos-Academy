/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pedidos', table => {
        table.bigIncrements('id').primary().index(),
            table.integer('cliente_id').notNullable().references('id').inTable('clientes'),
            table.string('observacao').nullable(),
            table.integer('valor_total').notNullable()

        table.comment('Tabela criada para adicionar pedidos')
    })
        .then(() => console.log('Tabela pedidos criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pedidos').then(() => console.log('Tabela pedidos removida'))
};