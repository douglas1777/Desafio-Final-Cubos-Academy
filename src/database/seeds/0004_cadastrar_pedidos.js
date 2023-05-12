/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    const [{ count }] = await knex('pedidos').count('* as count')

    if (!Number.isInteger(count) || count > 0) return

    return await knex('pedidos').insert([
        {
            "cliente_id": 1,
            "observacao": "o tomate ta caro",
            "valor_total": 3000,
        },
        {
            "cliente_id": 2,
            "valor_total": 6000,
        },
        {
            "cliente_id": 1,
            "observacao": "a gasolina aumentou",
            "valor_total": 3000,
        },
        {
            "cliente_id": 2,
            "valor_total": 6000,
        },

    ])
}