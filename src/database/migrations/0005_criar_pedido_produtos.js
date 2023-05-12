/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pedido_produtos', table => {
        table.bigIncrements('id').primary().index(),
            table.integer('pedido_id').notNullable().references('id').inTable('pedidos')
        table.integer('produto_id').notNullable().references('id').inTable('produtos')
        table.integer('quantidade_produto').notNullable(),
            table.integer('valor_produto').notNullable()

        table.comment('Tabela criada para adicionar os produtos dos pedidos')
    })
        .then(() => console.log('Tabela pedido_produtos criada com sucesso'))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pedido_produtos').then(() => console.log('Tabela pedido_produtos removida'))
};