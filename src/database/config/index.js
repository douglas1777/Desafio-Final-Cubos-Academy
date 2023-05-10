const { knex: Knex } = require('knex')
const { development, test, producao } = require('./conexao')

const pegaVariavel = () => {
 if (process.env.NODE_ENV == 'test') return test
 if (process.env.NODE_ENV == 'development') return development
 return producao
}
const knex = Knex(pegaVariavel())

module.exports = knex
