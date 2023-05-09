const path = require('path')
const teste = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: process.env.DATABASE_USER_TEST,
    password: process.env.DATABASE_USER_PASSWORD,
    database: 'pdv',
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: '../seeds',
  },
}

const producao = {
  client: 'pg',
  connection: {
    host: process.env.HOST_BD,
    port: process.env.PORT_BD,
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE_BD,
  },
}

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
