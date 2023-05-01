const { teste, producao } = require('./knex/variaveis')

const pegaVariavel = () => {
  if (process.env.NODE_ENV) {
    return teste
  }
  return producao
}

const knex = require('knex')({
  ...pegaVariavel(),
})

module.exports = knex
