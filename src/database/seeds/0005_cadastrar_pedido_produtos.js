/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    const [{ count }] = await knex('pedido_produtos').count('* as count')

    if (!Number.isInteger(count) || count > 0) return

    return await knex('pedido_produtos').insert([
        {
            "quantidade_produto": 1,
            "valor_produto": 3000,
            "pedido_id": 1,
            "produto_id": 3
        },
        {
            "quantidade_produto": 2,
            "valor_produto": 3000,
            "pedido_id": 2,
            "produto_id": 4
        },
        {
            "quantidade_produto": 1,
            "valor_produto": 3000,
            "pedido_id": 3,
            "produto_id": 5
        },
        {
            "quantidade_produto": 2,
            "valor_produto": 3000,
            "pedido_id": 4,
            "produto_id": 6
        }

    ])
}