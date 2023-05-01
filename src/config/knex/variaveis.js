const teste = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: process.env.DATABASE_USER_TEST,
    password: process.env.DATABASE_USER_PASSWORD,
    database: 'pdv',
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

module.exports = { teste, producao }
