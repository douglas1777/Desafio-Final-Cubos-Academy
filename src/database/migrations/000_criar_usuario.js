exports.up = function (knex) {
  return knex.schema
    .createTable('usuarios', function (table) {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.string('email').unique().notNullable()
      table.string('senha').notNullable()
    })
    .then(function () {
      console.log('Tabela criada');
      return knex('usuarios').insert([
        { nome: 'João', email: 'joao@gmail.com', senha: '123456' },
        { nome: 'Maria', email: 'maria@gmail.com', senha: '654321' },
      ])
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios')
}
