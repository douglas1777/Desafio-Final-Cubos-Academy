const path = require('path')

const development = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection, done) => {
      connection.run('PRAGMA foreign_keys = ON')
      done()
    },
  },
}

const test = {
  ...development,
  connection: ':memory:'
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

module.exports = { development, test, producao }
